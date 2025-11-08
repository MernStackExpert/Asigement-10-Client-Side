import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const Root = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Navbar></Navbar>
      </header>

      <main className='flex-grow mt-20'>
        <Outlet></Outlet>
      </main>

      <footer className='bg-red-300'>
        <Footer></Footer>
      </footer>
      
    </div>
  );
};

export default Root;