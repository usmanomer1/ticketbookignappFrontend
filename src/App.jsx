import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBooking from './pages/CreateBooking';
import EditBooking from './pages/EditBooking';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreateBooking />} />
                <Route path="/edit/:id" element={<EditBooking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
