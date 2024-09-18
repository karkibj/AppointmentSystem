import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: value
        });
        // console.log(formData)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
    
            const data = await response.json();
            console.log(data);
           
            if (response.ok) {
                // Extract tokens
                const { accessToken, refreshToken } = data.data;
                console.log(accessToken)
    
                // Optionally, you can store the tokens in localStorage or cookies
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                
    
                //role based access 
                const userRole = data.data.user.role;
                localStorage.setItem('userRole',userRole)
                console.log(userRole)
                switch(userRole){
                    case "admin":
                        navigate('/admin/dashboard', { replace: true });
                        break;
                    case "doctor":
                        alert("Doctor trying to login");
                        break;
                    default:
                        navigate("/", { replace: true });
                }
                
                alert(data.message);
            } else {
                alert(data.message);
            }
    
        } catch (err) {
            console.log("Error occurred: ", err);
            alert(err.message);
        }
    };
    

    return (
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
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                        >
                            Login
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
    );
};

export default Login;
