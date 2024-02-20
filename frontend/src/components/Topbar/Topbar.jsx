// Import necessary elements from react-router-dom if you need link or navigation capabilities
import { Link } from 'react-router-dom';

const Topbar = () => {
    // Define the UI for your Topbar
    return (
        <div className='bg-gray-900 text-white p-4 flex justify-between items-center'>
            <h1 className='text-xl'>Problems Portal</h1>
            <nav>
                {/* Example navigation links, adjust as needed */}
                <Link to="/" className='text-white px-4 hover:text-gray-300'>Home</Link>
                
                <Link to="/Logout" className='text-white px-4 hover:text-gray-300'>Logout</Link>
            </nav>
        </div>
    );
};

export default Topbar;
