"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs"; // Handles user profile info
import User from "../../comp/userhandle"; // Handles user info
import CryptoHandle from "../../comp/cryptohandle"; // Handles crypto API data
import CryptoCheck from "../../comp/cryptocheck"; // Handles crypto check

const UserId = () => {
  return (
    <main className="flex flex-col min-h-screen">
      {/* ✅ Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-white shadow-md flex items-center justify-between px-6 py-4">
        <User />
        <UserButton />
      </nav>

      {/* Main Content*/}
      <div className="flex flex-col items-center justify-center mt-20 w-full px-4">
        {/* Side-by-side layout*/}
        <div className="flex flex-wrap justify-center w-full gap-6">
          <CryptoHandle />
          <CryptoCheck />
        </div>
      </div>
    </main>
  );
};

export default UserId;
