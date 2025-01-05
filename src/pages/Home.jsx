import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch all bookings from the backend
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://ticketbookingapp-production.up.railway.app/TicketBookingApp/api/bookings', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => {
                setBookings(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the bookings!', error);
            });
    }, []);

    // Delete booking by ID
    const deleteBooking = (id) => {
        if (window.confirm("Are you sure you want to delete this booking?")) {
            const token = localStorage.getItem('token');
            axios.delete(`https://ticketbookingapp-production.up.railway.app/TicketBookingApp/api/bookings/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(() => {
                    alert('Booking deleted successfully!');
                    setBookings(bookings.filter(booking => booking.tid !== id));
                })
                .catch(error => {
                    console.error('There was an error deleting the booking!', error);
                });
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>My Bookings</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>
            <Link to="/create">
                <button className="add-booking-button">Add New Booking</button>
            </Link>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Customer Name</th>
                    <th>Destination</th>
                    <th>Package Type</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {bookings.map(booking => (
                    <tr key={booking.tid}>
                        <td>{booking.tid}</td>
                        <td>{booking.customerName}</td>
                        <td>{booking.destination}</td>
                        <td>{booking.packageType}</td>
                        <td>${booking.price}</td>
                        <td>{booking.status}</td>
                        <td>
                            <button onClick={() => navigate(`/edit/${booking.tid}`)}>Edit</button>
                            <button onClick={() => deleteBooking(booking.tid)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
