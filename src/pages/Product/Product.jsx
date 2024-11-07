import React, { useState, useEffect } from 'react';
import './Product.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { createBooking } from '../../api/equipments/booking';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import instance from '../../api/config';
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

const Product = () => {
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [equipment, setEquipment] = useState(null);
    const [invalidDate, setInvalidDate] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getEquipment = async () => {
            try {
                const docRef = doc(db, "equipmentListings", params.id);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    console.log(docSnap.data())
                    setEquipment(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching equipment data:", error);
            }
        };
        getEquipment();
    }, [params.id]);

    const handleSelect = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    };

    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    const formattedStartDate = format(new Date(startDate), "yyyy-MM-dd");
    const formattedEndDate = format(new Date(endDate), "yyyy-MM-dd");

    const handleBooking = async () => {
        await createBooking(equipment?.id, formattedStartDate, formattedEndDate, "22:22", "01:01");
        navigate('/booking-history');
    };

    const getDaysArray = (start, end) => {
        const arr = [];
        for(let dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)){
            arr.push(new Date(dt));
        }
        return arr;
    };

    const arr = [];

    const fetchInvalid = () => {
        const getBookingValidity = async () => {
            const headers = {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get('access-token')}`
            };
            const { data } = await instance.get(`/api/booking/?search=${equipment?.title}&ordering=start_date`, { headers });
            setInvalidDate(data);
        }
        getBookingValidity();
    };

    invalidDate?.forEach(booking => {
        getDaysArray(booking.start_date, booking.end_date).forEach(item => arr.push(item));
    });

    return (
        <div>
            <div className='productHero'>
                <Carousel
                    autoplay
                    infiniteLoop
                    showStatus={false}
                    showIndicators={false}
                    showThumbs={false}
                    interval={3000}
                    dynamicHeight
                >
                    {equipment?.images?.map((image, index) => (
                        <div key={index} className="relative">
                            <img style={{ height: '300px', width: '800px', objectFit: 'contain' }} src={image} alt='' />
                        </div>
                    ))}
                </Carousel>
            </div>

            <div className='flex justify-around max-w-7xl mx-auto mt-12'>
                <div className='flex-1 w-56'>
                    <div className='flex justify-between border-b-2 pb-6 items-center'>
                        <div>
                            <h3 className='text-lg text-gray-500 font-bold'>{equipment?.manufacturer}</h3>
                            <h2 className='text-xl text-gray-800 font-bold'>{equipment?.model_type}</h2>
                        </div>
                        <div>
                            <i className="text-red-500 fa-solid fa-thumbs-up ml-1.5 text-xl"></i>
                            <p className='text-red-500 text-xs'>Add to Wishlist</p>
                        </div>
                    </div>

                    <div className='py-6 border-b-2'>
                        <h1 className='text-lg font-bold text-gray-800'>Description</h1>
                        <p className='text-sm font-bold text-gray-500 pt-2'>{equipment?.description}</p>
                    </div>

                    <h1 className='py-3 text-lg text-gray-700 font-bold'>Specifications</h1>
                    <div className='flex justify-between border-b-2 pb-6 items-center'>
                        <div>
                            <h3 className='text-md text-gray-500 font-bold'>Manufacturer</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.manufacturer}</h1>
                        </div>
                        <div>
                            <h3 className='text-md text-gray-500 font-bold'>Model</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.model_name}</h1>
                        </div>
                        <div>
                            <h3 className='text-md text-gray-500 font-bold'>Manufacturing Year</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.equipment_age}</h1>
                        </div>
                    </div>

                    <div className='flex justify-between border-b-2 py-6 items-center'>
                        <div>
                            <h3 className='text-md text-gray-500 font-bold'>Condition</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.condition}</h1>
                        </div>
                        <div>
                            <h3 className='text-md text-gray-500 font-bold'>Horsepower</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.specs?.engine_power}</h1>
                        </div>
                      {equipment?.specs?.transmission&&  <div>
                            <h3 className='text-md text-gray-500 font-bold'>transmission</h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.specs?.transmission}</h1>
                        </div>}
                        {equipment?.specs?.fuel_capacity&&  <div>
                            <h3 className='text-md text-gray-500 font-bold'>Fuel Capacity </h3>
                            <h1 className='text-sm text-gray-500 font-semibold'>{equipment?.specs?.fuel_capacity}</h1>
                        </div>}
                    </div>
                    
                    <div className='py-6 flex justify-center border-b-2'>
                        <a href="/update-profile" className='font-semibold text-sm text-green-700'>Know Your Provider <i className="pl-1 fa-solid fa-angle-right"></i></a>
                    </div>
                </div>

                <div className='flex-1 w-32'>
                    <div className='border p-8 m-10'>
                        <h1 className='text-right text-lg font-bold border-b-2 pb-3'>Rs {equipment?.daily_rent} per day</h1>
                        <button onClick={() => { setVisible(!visible); fetchInvalid(); }} className='px-3 py-1 border my-4 w-full text-md font-semibold text-gray-800 cursor-pointer'>Check Availability <i className="pl-2 fa-solid fa-angles-down"></i></button>
                        <div style={{ display: !visible && 'none' }}>
                            <DateRangePicker
                                ranges={[selectionRange]}
                                minDate={new Date()}
                                disabledDates={arr}
                                rangeColors={["#68AC5D"]}
                                onChange={handleSelect}
                            />
                        </div>
                        {
                            Cookies.get('access-token') ? (
                                <button onClick={handleBooking} className="bg-darkgreen hover:bg-[#8cdf80] text-white w-full font-semibold py-1 px-8 rounded">
                                    Book Now
                                </button>
                            ) : (
                                <button className="bg-darkgreen opacity-50 cursor-not-allowed text-white w-full font-semibold py-1 px-8 rounded">
                                    Book Now
                                </button>
                            )
                        }
                    </div>
                    <p className='text-center'><i className="pr-2 text-red-500 fa-solid fa-flag"></i> <a className='text-red-500 font-semibold text-md underline-offset-2' onClick={() => navigate(`/equipment-report/${equipment?.id}`)}>Report this equipment</a></p>
                </div>
            </div>
        </div>
    );
};

export default Product;
