import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        // Prepare the payload
        const payload = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
        };

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert("Registration successful! You can now log in.");
                navigate('/login', { replace: true });
            } else {
                alert(data.message);
            }

        } catch (err) {
            console.log("Error occurred: ", err);
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                            Name
                        </label>
                        <input
                            onChange={handleInputChange}
                            value={formData.name}
                            name="name"
                            type="text"
                            id="name"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                            Phone
                        </label>
                        <input
                            onChange={handleInputChange}
                            value={formData.phone}
                            name="phone"
                            type="text"
                            id="phone"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your phone number"
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm Password
                        </label>
                        <input
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            name="confirmPassword"
                            type="password"
                            id="confirmPassword"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600 text-sm">
                        Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
