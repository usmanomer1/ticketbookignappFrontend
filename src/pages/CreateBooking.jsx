import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateBooking.css';

function CreateBooking() {
    const [formData, setFormData] = useState({
        customerName: '',
        destination: '',
        packageType: '',
        price: '',
        status: 'Pending',
    });

    const navigate = useNavigate(); // Hook to navigate to different pages

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/TicketBookingApp/api/bookings', formData)
            .then(() => {
                navigate('/'); // Redirect to Home Page
            })
            .catch(error => {
                console.error('There was an error creating the booking!', error);
            });
    };

    return (
        <div>
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>Customer Name:</label>
                <input type="text" name="customerName" onChange={handleChange} required />

                <label>Destination:</label>
                <input type="text" name="destination" onChange={handleChange} required />

                <label>Package Type:</label>
                <input type="text" name="packageType" onChange={handleChange} required />

                <label>Price:</label>
                <input type="number" name="price" onChange={handleChange} required />

                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
}

export default CreateBooking;
