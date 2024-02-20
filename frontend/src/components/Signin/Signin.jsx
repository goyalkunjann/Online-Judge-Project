import { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Signin = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <form className="space-y-6 px-6 py-4 bg-gray-700 rounded-lg shadow-md" style={{ minWidth: '320px' }}>
                <h3 className="text-xl font-medium text-white text-center">Sign in</h3>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Your Email</label>
                    <input type="email" id="email" name="email" required
                           className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white"
                           value={formData.email} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">Your Password</label>
                    <input type="password" id="password" name="password" required
                           className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white"
                           value={formData.password} onChange={handleChange} />
                </div>
                <button type="button" // Changed to type="button" for UI purposes
                        className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white font-semibold">
                    Sign In
                </button>
                <div className="mt-4 text-center">
                    <Link to="/resetpassword" className="text-blue-300 hover:underline">Forgot Password?</Link>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-gray-300">Donot have an account? </span>
                    <Link to="/signup" className="text-blue-300 hover:underline">Sign Up</Link>
                </div>
            </form>
        </div>
    );
};

export default Signin;
