import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../pages/login.png';
import { FaHome } from 'react-icons/fa'; // Importing a home icon
import Alert from '../Components/common/Alert';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState({ message: '', type: '', visible: false }); // Alert state

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setAlert({ ...alert, visible: false }); // Hide alert on input change
    };

    const validateEmail = (email) => {
        // Simple regex for email validation
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!formData.email || !formData.password) {
                setAlert({ message: "Please fill in all the fields.", type: 'error', visible: true });
                setLoading(false);
                return;
            }

            if (!validateEmail(formData.email)) {
                setAlert({ message: "Please enter a valid email.", type: 'error', visible: true });
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (!response.ok) {
                const errorMsg = data.message || "An error occurred during login.";
                throw new Error(errorMsg);
            }

            const { accessToken, refreshToken, user } = data.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userRole', user.role);

            switch (user.role) {
                case "admin":
                    navigate('/admin/dashboard', { replace: true });
                    break;
                case "doctor":
                    navigate('/doctor/dashboard', { replace: true });
                    break;
                default:
                    navigate("/", { replace: true });
            }

            setAlert({ message: "Login successful!", type: 'success', visible: true });
            setFormData({ email: '', password: '' }); // Clear form on success
        } catch (error) {
            console.error("Login error:", error);
            setAlert({ message: error.message || "An error occurred during login. Please try again.", type: 'error', visible: true });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseAlert = () => {
        setAlert({ ...alert, visible: false }); // Hide alert
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">
            <div className="bg-white shadow-lg rounded-2xl flex overflow-hidden max-w-4xl w-full">
                {/* Left Side with Image */}
                <div className="w-1/2 bg-blue-100 flex justify-center items-center">
                    <img
                        src={logo}
                        alt="Login Illustration"
                        className="w-3/4 h-auto"
                    />
                </div>

                {/* Right Side with Form */}
                <div className="w-1/2 p-8 flex flex-col justify-center">
                    {/* Returning Home Button */}
                    <div className="mb-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition"
                        >
                            <FaHome className="mr-2" />Home
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign In</h2>
                    <p className="text-sm text-gray-600 text-center mb-6">Unlock your world.</p>

                    {/* Show Alert if visible */}
                    {alert.visible && (
                        <Alert 
                            message={alert.message} 
                            type={alert.type} 
                            onClose={handleCloseAlert} 
                        />
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                Email
                            </label>
                            <input
                                onChange={handleInputChange}
                                value={formData.email}
                                name="email"
                                type="email"
                                id="email"
                                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                                Password
                            </label>
                            <input
                                value={formData.password}
                                onChange={handleInputChange}
                                name="password"
                                type="password"
                                id="password"
                                className={`w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
                    </div>

                    <div className="text-center mt-3">
                        <a href="/register" className="text-sm text-gray-600">
                            Create an account
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
