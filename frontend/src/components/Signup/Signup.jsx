import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: "",
        userid: "", // Assuming you've added userid based on the form above
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Navigation to the problems page directly for the purpose of this example, skipping backend integration
        navigate("/problems");
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <form className="space-y-6 px-6 py-4 bg-gray-700 rounded-lg shadow-md" onSubmit={handleSubmit} style={{ minWidth: '400px' }}>
                <h3 className="text-xl font-medium text-white text-center">Sign Up</h3>
                <div>
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <input type="text" name="name" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <input type="email" name="email" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.email} onChange={handleChange} />
                </div>
               
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
                    <input type="password" name="password" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.password} onChange={handleChange} />
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
