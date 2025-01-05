import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            await axios.post(
                'http://localhost:8080/TicketBookingApp/api/auth/register',
                { username: formData.username, password: formData.password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            alert('Registration successful! Please log in.');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            console.error('There was an error registering!', error);
            alert('Registration failed. Please try again.');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ background: '#333', padding: '20px', borderRadius: '8px' }}>
                <h2 style={{ color: '#fff' }}>Register</h2>

                <label style={{ color: '#fff' }}>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <label style={{ color: '#fff' }}>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <label style={{ color: '#fff' }}>Confirm Password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Register
                </button>

                <Link to="/login">
                    <button type="button" style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        Back to Login
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Register;
