"use client";

import React, { useEffect, useState } from "react";

const CryptoHandle = () => {
  const [cryptoData, setCryptoData] = useState<{ bitcoin?: { cad: number; cad_24h_change: number } } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCrypto = async () => {
      try {
        const response = await fetch("/api/crypto");
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrypto();
  }, []);

  return (
    <aside className="w-80 bg-white p-6 rounded-lg shadow-lg ml-6 max-h-80 overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crypto Portfolio</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : cryptoData?.bitcoin ? (
        <div>
          <p className="text-xl">Bitcoin Price (CAD): ${cryptoData.bitcoin.cad}</p>
          <p className="text-sm text-gray-500">
            24h Change: {cryptoData.bitcoin.cad_24h_change.toFixed(2)}%
          </p>
        </div>
      ) : (
        <p className="text-red-500">Failed to load data</p>
      )}
    </aside>
  );
};

export default CryptoHandle;
