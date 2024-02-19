
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleSignInClick = () => {
    navigate('/Signin'); // Navigate to Sign In page
  };

  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24 h-20'>
      <Link to='/' className='flex items-center justify-center'>
        <img src={logo} alt='CodeSchool' className='h-12' />
      </Link>
      <div className='flex items-center'>
        <button 
          onClick={handleSignInClick} // Assign click handler
          className='bg-brand-blue text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:bg-brand-blue hover:text-brand-blue border-2 border-brand-blue transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50'>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;
