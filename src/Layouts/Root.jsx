import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar></Navbar>
      </header>

      <main className="flex-grow mt-20">
        <Outlet></Outlet>
      </main>

      <footer className="bg-red-300">
        <Footer></Footer>
      </footer>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default Root;
