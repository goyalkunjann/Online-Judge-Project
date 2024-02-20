import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Assuming the API call logic here
        navigate("/Signup");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-800">
            <form 
                className='space-y-6 px-8 py-8 bg-gray-700 rounded-lg shadow-md' 
                onSubmit={handleSubmit} 
                style={{ maxWidth: '320px' }} // Removed fixed height for natural content flow
            >
                <h3 className='text-xl font-medium text-white text-center'>Reset Password</h3>
                <p className='text-sm text-white text-center mb-4'>
                    Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to reset it.
                </p>
                <div className="w-full">
                    <label htmlFor='email' className='text-sm font-medium text-gray-400 block mb-2'>
                        Your email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2.5 mt-1 bg-gray-600 border-2 border-gray-500 text-white rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
                        placeholder='name@company.com'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full mt-4 bg-brand-orange hover:bg-brand-orange-dark text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300'
                >
                    Send Reset Email
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
