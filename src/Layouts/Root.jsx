import React, { useEffect } from 'react';
import Navbar from "../Components/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        document.title = 'FinEase | Home';
        break;
      case '/add-transaction':
        document.title = 'FinEase | Add Transaction';
        break;
      case '/my-transactions':
        document.title = 'FinEase | My Transactions';
        break;
      case '/reports':
        document.title = 'FinEase | Reports';
        break;
      case '/my-profile':
        document.title = 'FinEase | My Profile';
        break;
      case '/auth/login':
        document.title = 'FinEase | Login';
        break;
      case '/auth/register':
        document.title = 'FinEase | Register';
        break;
      default:
        if (location.pathname.startsWith('/transaction-details/')) {
          document.title = 'FinEase | Transaction Details';
        } else if (location.pathname.startsWith('/update-transaction/')) {
          document.title = 'FinEase | Update Transaction';
        } else {
          document.title = 'FinEase';
        }
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar></Navbar>
      </header>

      <main className="flex-grow mt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="bg-base-200">
        <Footer></Footer>
      </footer>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Root;