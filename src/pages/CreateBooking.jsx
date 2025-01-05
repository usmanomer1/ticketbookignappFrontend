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

    // Handle form changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get the token from localStorage
            const token = localStorage.getItem('token');

            if (!token) {
                alert('You need to log in first!');
                navigate('/login');
                return;
            }

            // Make the POST request with the Bearer token
            await axios.post(
                'https://ticketbookingapp-production.up.railway.app/TicketBookingApp/api/bookings',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Redirect to Home Page after successful booking creation
            navigate('/');
        } catch (error) {
            console.error('There was an error creating the booking!', error);
            alert('Failed to create booking. Please try again.');
        }
    };

    // JSX for the form
    return (
        <div>
            <h1>Create Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>Customer Name:</label>
                <input
                    type="text"
                    name="customerName"
                    onChange={handleChange}
                    value={formData.customerName}
                    required
                />

                <label>Destination:</label>
                <input
                    type="text"
                    name="destination"
                    onChange={handleChange}
                    value={formData.destination}
                    required
                />

                <label>Package Type:</label>
                <input
                    type="text"
                    name="packageType"
                    onChange={handleChange}
                    value={formData.packageType}
                    required
                />

                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    value={formData.price}
                    required
                />

                <button type="submit">Create Booking</button>
            </form>
        </div>
    );
}

export default CreateBooking;
