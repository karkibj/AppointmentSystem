import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false); // Loading state to disable button during API calls

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading when form is submitted

        try {
            // Basic form validation
            if (!formData.email || !formData.password) {
                alert("Please fill in all the fields.");
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
                // Handle non-200 responses
                const errorMsg = data.message || "An error occurred during login.";
                throw new Error(errorMsg);
            }

            // Handle successful login
            const { accessToken, refreshToken, user } = data.data;
            
            // Store tokens securely (optional: use httpOnly cookies for sensitive data)
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userRole', user.role);

            // Role-based redirection
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

            alert("Login successful!");
        } catch (error) {
            // Handle client-side or network errors
            console.error("Login error:", error);
            alert(error.message || "An error occurred during login. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <>
        <Header/>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Doctor Appointment System</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            onChange={handleInputChange}
                            value={formData.email}
                            name="email"
                            type="email"
                            id="email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Password
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleInputChange}
                            name="password"
                            type="password"
                            id="password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={loading} // Disable the button while loading
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                        Don't have an account? <a href="/register" className="text-blue-500 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
    
};

export default Login;
