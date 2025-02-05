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

  if (loading) return <p>Loading...</p>;
  if (!cryptoData?.bitcoin) return <p className="text-red-500">Failed to load data</p>;

  return (
    <div className="mt-10 text-center">
      <h1 className="text-2xl font-bold">Crypto Portfolio</h1>
      <p className="text-xl">Bitcoin Price (CAD): ${cryptoData.bitcoin.cad}</p>
      <p className="text-sm text-gray-500">24h Change: {cryptoData.bitcoin.cad_24h_change.toFixed(2)}%</p>
    </div>
  );
};

export default CryptoHandle;
