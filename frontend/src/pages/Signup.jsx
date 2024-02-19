import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '', // Changed from firstname and lastname to match backend
        email: '',
        userid: '', // Changed from username to userid to match backend
        password: '',
        cpassword: '', // Added confirm password field
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Necessary for cookies to work
            });
    
            if (!response.ok) {
                throw new Error('Signup failed');
            }
    
            const data = await response.json();
            console.log('Registration successful', data);
            navigate('/signin'); // Adjust the navigation path as needed
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error
        }
    };
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <form className="space-y-6 px-6 py-4 bg-gray-700 rounded-lg shadow-md" onSubmit={handleSubmit} style={{ minWidth: '400px' }}>
                <h3 className="text-xl font-medium text-white text-center">Sign Up</h3>
                {/* Form fields updated to match backend */}
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <input type="text" name="name" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <input type="email" name="email" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="userid" className="text-sm font-medium text-gray-300">UserID</label>
                    <input type="text" name="userid" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.userid} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                    <input type="password" name="password" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.password} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cpassword" className="text-sm font-medium text-gray-300">Confirm Password</label>
                    <input type="password" name="cpassword" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.cpassword} onChange={handleChange} />
                </div>
                <button type="submit" className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white font-semibold">Sign Up</button>
                <div className="mt-4 text-center">
                    <span className="text-gray-300">Already have an account? </span>
                    <Link to="/signin" className="text-blue-300 hover:underline">Sign In</Link>
                </div>
            </form>
        </div>
    );
};

export default Signup;
