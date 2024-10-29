import joblib
import pandas as pd
import numpy as np
from fastapi import FastAPI
from pydantic import BaseModel
from firebase_admin import credentials, firestore, initialize_app

# Initialize Firebase
cred = credentials.Certificate("kehtisahayaak-firebase-adminsdk-1kbh4-1f833b8870.json")  # Add your Firebase service account key here
initialize_app(cred)
db = firestore.client()

# Load the trained model
model = joblib.load('crop_predictor.pkl')

# List of crop names based on your label encoder
crop_names = ['apple', 'banana', 'blackgram', 'chickpea', 'coconut', 'coffee', 'cotton', 'grapes', 'jute', 
              'kidneybeans', 'lentil', 'maize', 'mango', 'mothbeans', 'mungbean', 'muskmelon', 'orange', 
              'papaya', 'pigeonpeas', 'pomegranate', 'rice', 'watermelon']

# Define FastAPI instance
app = FastAPI()

# Define the request model
class CropInput(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float
class CropProductionInput(BaseModel):
    crop_name: str
    production_value: float
    
def apply_temperature_scaling(logits, temperature=1.5):
    exp_logits = np.exp(logits / temperature)
    return exp_logits / np.sum(exp_logits)

def predict_top_3_crops(N, P, K, temperature, humidity, ph, rainfall, temperature_scale=1.5):
    # Create a DataFrame for the input
    input_data = pd.DataFrame({
        'N': [N],
        'P': [P],
        'K': [K],
        'temperature': [temperature],
        'humidity': [humidity],
        'ph': [ph],
        'rainfall': [rainfall]
    })
    
    # Get raw probabilities
    logits = model.predict_proba(input_data)[0]
    
    # Apply temperature scaling
    scaled_probs = apply_temperature_scaling(logits, temperature=temperature_scale)
    
    # Get indices of the top 3 predictions
    top_3_indices = np.argsort(scaled_probs)[-3:][::-1]
    
    # Map indices to crop names and probabilities
    top_3_crops = [(crop_names[i], scaled_probs[i]) for i in top_3_indices]
    
    return top_3_crops

def get_production_value(crop_name):
    # Fetch production value from Firestore
    crop_doc = db.collection('crops').document(crop_name).get()
    if crop_doc.exists:
        return crop_doc.to_dict().get('production', float('inf'))
    return float('inf')  # Return infinity if the crop is not found

@app.post("/predict_crop")
async def predict_crop(input_data: CropInput):
    # Predict the top 3 crops
    top_3_crops = predict_top_3_crops(input_data.N, input_data.P, input_data.K,
                                      input_data.temperature, input_data.humidity,
                                      input_data.ph, input_data.rainfall)
    
    # Get production values for the top 3 crops
    top_3_with_production = []
    for crop, prob in top_3_crops:
        production_value = get_production_value(crop)
        top_3_with_production.append((crop, prob, production_value))
    
    # Find the crop with the minimum production value
    best_crop = min(top_3_with_production, key=lambda x: x[2])
    
    return {
        "recommended_crop": best_crop[0],
        "probability": best_crop[1],
        "production_value": best_crop[2]
    }
@app.post("/add_production/")
def add_crop_production(crop_data: CropProductionInput):
    # Reference to your Firebase Firestore collection
    crops_ref = db.collection('crops')

    # Get the existing crop document
    crop_doc = crops_ref.document(crop_data.crop_name).get()
    
    if crop_doc.exists:
        # Get the current production value
        current_production = crop_doc.to_dict().get('production', 0)

        # Update the production value
        new_production = current_production + crop_data.production_value
        crops_ref.document(crop_data.crop_name).update({"production": new_production})
    else:
        # If the crop doesn't exist, create a new document
        crops_ref.document(crop_data.crop_name).set({
            "production": crop_data.production_value
        })

    return {"message": f"Updated production for {crop_data.crop_name}. New value: {new_production}"}
# To run the server, use: `uvicorn filename:app --reload`
