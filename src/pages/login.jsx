import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'https://ticketbookingapp-production.up.railway.app/TicketBookingApp/api/auth/login',
                { username, password },
                { headers: { 'Content-Type': 'application/json' } }
            );

            // Store the JWT token in local storage
            localStorage.setItem('token', response.data);

            // Redirect to the home page after successful login
            navigate('/');
        } catch (error) {
            alert('Invalid username or password');
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ background: '#333', padding: '20px', borderRadius: '8px' }}>
                <h2 style={{ color: '#fff' }}>Login</h2>

                <label style={{ color: '#fff' }}>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
                />

                <label style={{ color: '#fff' }}>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
                />

                <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Login
                </button>

                <Link to="/Register">
                    <button type="button" style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px' }}>
                        Register
                    </button>
                </Link>
            </form>
        </div>
    );
}

export default Login;
