import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const Root = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <header>
        <Navbar></Navbar>
      </header>

      <main className='flex-grow mt-50'>
        <Outlet></Outlet>
      </main>

      <footer className='bg-red-300'>
        h1 this is footer
      </footer>
      
    </div>
  );
};

export default Root;