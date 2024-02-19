import  { useState } from 'react';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8090/resetpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (response.ok) {
                alert('If an account exists for this email, a reset link has been sent.');
            } else {
                alert('There was an issue sending the reset email. Please try again.');
            }
        } catch (error) {
            console.error('Reset password error:', error);
            alert('An error occurred while trying to reset the password.');
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-800">
            <form className='space-y-6 px-6 py-5 bg-gray-700 rounded-lg shadow-md mt-12' onSubmit={handleSubmit}>
                <h3 className='text-xl font-medium text-white text-center'>Reset Password</h3>
                <p className='text-sm text-white text-center mb-4'>
                    Forgotten your password? Enter your e-mail address below, and we will send you an e-mail allowing you to reset it.
                </p>
                <div>
                    <label htmlFor='email' className='text-sm font-medium block mb-2 text-gray-300'>
                        Your email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white'
                        placeholder='name@company.com'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s'
                >
                    Send Reset Email
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
