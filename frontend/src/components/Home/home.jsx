// Importing Navbar from the navbar folder, which is at the same level as the home folder
import Navbar from "../Navbar/Navbar"; // Adjusted import for Navbar
import hero from '../../assets/hero.png'; // Assuming the assets folder is at the root level

const Home = () => {
    
    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
                    <img src={hero} alt='Hero' style={{ maxWidth: '700px', maxHeight: '700px' }} />
                </div>
            </div>
        </div>
    );
};

export default Home;
