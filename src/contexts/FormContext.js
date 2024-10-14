import { createContext, useState } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const title = {
        0: 'Select Equipment',
        1: 'Select Brand ,Model Type,Model Name,Model Specs',
        2: 'Availibility , Daily rent , Upload Images , Equipment purchase date'
    };

    const [addProductPage, setAddProductPage] = useState(0);

    const [clientRentingEquipment, setClientRentingEquipment] = useState({
        images: [],
        equipment_type: '',
        manufacturer: '',
        model_type: '',
        model_name: '',
        specs: {},
        uuid: '',
        daily_rent: 0,
        available_from: Date(),
        avaiable_till : Date(),
        location: {
            lattitude:null,
            longitude:null,
            address: '',
            city: '',
            state: '',
            zipCode: '',
          },
        equipment_age:null,
        equipment_id:null,
    });

    const handleChange = e => {
        const type = e.target.type;
        const name = e.target.name;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;

        setClientRentingEquipment(prevClientRentingData => ({
            ...prevClientRentingData,
            [name]: value
        }));
    };

    const canSubmit = Object.values(clientRentingEquipment).every(Boolean) && addProductPage === Object.keys(title).length - 1;

    const canNextPage1 = clientRentingEquipment.equipment_type !== '';
    const canNextPage2 = clientRentingEquipment.manufacturer !== '';
    const canNextPage3 = clientRentingEquipment.model_type !== '';
    const canNextPage4 = clientRentingEquipment.model_name !== '';

    const disablePrev = addProductPage === 0;

    const disableNext =
        (addProductPage === Object.keys(title).length - 1)
        || (addProductPage === 0 && !canNextPage1)
        || (addProductPage === 1 && !canNextPage2)
        || (addProductPage === 2 && !canNextPage3)
        || (addProductPage === 3 && !canNextPage4);

    const prevHide = addProductPage === 0 && "remove-button";

    const nextHide = addProductPage === Object.keys(title).length - 1 && "remove-button";

    const submitHide = addProductPage !== Object.keys(title).length - 1 && "remove-button";

    return (
        <FormContext.Provider value={{
            title,
            addProductPage,
            setAddProductPage,
            clientRentingEquipment,
            setClientRentingEquipment,
            canSubmit,
            handleChange,
            disablePrev,
            disableNext,
            prevHide,
            nextHide,
            submitHide
        }}>
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;
