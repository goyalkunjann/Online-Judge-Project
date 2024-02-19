// src/components/Layout.jsx

import React from 'react';
import Navbar from '../components/navbar.jsx' // Ensure this matches the actual file name/path.

const Layout = ({ children }) => {
  return (
    <div className='bg-gradient-to-b from-gray-600 to-black min-h-screen relative'>
      <Navbar />
      <div className='max-w-7xl mx-auto px-4'>
      <div className='flex items-center justify-center h-[calc(100vh-5rem)] pointer-events-none select-none'>
            <img src={hero} alt='Hero' style={{ maxWidth: '700px', maxHeight: '700px' }} />
        </div>
        {children} {/* This renders the content of the current route */}
      </div>
    </div>
  );
};

export default Layout;
