import axios from "./config";

export const submitFeedback = async ({ name, phone_number, description }) => {
    try {
      return await axios.post("/enquiry/feedback", {
        name,
        phone_number,
        description,
      });
    } catch (error) {
      console.log("Error while calling submitFeedback API", error);
    }
  };
  