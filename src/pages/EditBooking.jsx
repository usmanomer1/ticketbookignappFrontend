import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBooking.css';

function EditBooking() {
    const { id } = useParams(); // Get the booking ID from the URL
    const [formData, setFormData] = useState({
        customerName: '',
        destination: '',
        packageType: '',
        price: '',
        status: '',
    });
    const navigate = useNavigate();

    // Fetch the booking details by ID
    useEffect(() => {
        axios.get(`http://localhost:8080/TicketBookingApp/api/bookings/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the booking!', error);
            });
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8080/TicketBookingApp/api/bookings/${id}`, formData)
            .then(() => {
                alert('Booking updated successfully!');
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error updating the booking!', error);
            });
    };

    return (
        <div>
            <h1>Edit Booking</h1>
            <form onSubmit={handleSubmit}>
                <label>Customer Name:</label>
                <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                />

                <label>Destination:</label>
                <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                />

                <label>Package Type:</label>
                <input
                    type="text"
                    name="packageType"
                    value={formData.packageType}
                    onChange={handleChange}
                    required
                />

                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />

                <label>Status:</label>
                <input
                    type="text"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Update Booking</button>
            </form>
        </div>
    );
}

export default EditBooking;
