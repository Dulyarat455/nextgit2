// components/Navbar.js
import React from "react";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
    <div className="bg-green-500 p-4">
    <div className="flex items-center">
      <div className="mr-6">
        <Link href="/">
          <p className="text-white font-semibold">Home</p>
        </Link>
      </div>
      <div className="mr-6">
        <Link href="/login">
          <p className="text-white font-semibold">Login</p>
        </Link>
      </div>
      <div className="mr-6">
        <Link href="/register">
          <p className="text-white font-semibold">Register</p>
        </Link>
      </div>
      {/* Add more navigation links here */}
    </div>
  </div>
  </div>

  );
};

export default Navbar;
