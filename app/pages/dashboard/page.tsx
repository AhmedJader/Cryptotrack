"use client";

import React from "react";
import { UserButton } from "@clerk/nextjs";//handles user profile info
import User from "../../comp/userhandle"; //handles user info
import CryptoHandle from "../../comp/cryptohandle"; //handles crypto api data
const UserId = () => {
  return (
    <main>
      <div className="flex min-h-screen flex-col items-center justify-center">
        {/* Header content */}
        <div className="fixed top-5 right-5">
          <UserButton />
        </div>
        <div className="fixed top-5 left-5">
          <User />
        </div>

        {/* Crypto Portfolio */}
        <CryptoHandle />
      </div>
    </main>
  );
};

export default UserId;
