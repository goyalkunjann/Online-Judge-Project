import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8090/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        // Optionally save the token to localStorage or context for further requests
        localStorage.setItem('token', data.token);
        navigate("/Problems"); // Adjust as necessary
      } else {
        alert(data.message || 'An error occurred during login. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <form className="space-y-6 px-6 py-4 bg-gray-700 rounded-lg shadow-md" onSubmit={handleSubmit} style={{ minWidth: '400px' }}>
        <h3 className="text-xl font-medium text-white text-center">Sign In</h3>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
          <input type="email" name="email" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
          <input type="password" name="password" required className="mt-1 p-2 w-full rounded-md bg-gray-800 border-gray-700 text-white" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white font-semibold">Sign In</button>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Donot have an account? </span>
          <Link to="/signup" className="text-blue-300 hover:underline">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
