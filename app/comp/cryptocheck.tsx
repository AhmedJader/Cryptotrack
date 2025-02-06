"use client"; // Tells Next.js to treat this component as a client-side component (not server-side rendering)

import React, { useEffect, useState } from "react"; // Importing React, useEffect and useState hooks from React

// Defining the CryptoCheck functional component
const CryptoCheck = () => {
  // Initializing the state for crypto data (array of strings or null) and loading state (boolean)
  const [cryptoData, setCryptoData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect hook to fetch the currency list from the API when the component mounts
  useEffect(() => {
    // Defining an asynchronous function to fetch data from the API
    const fetchList = async () => {
      try {
        // Fetching the data from the backend API endpoint (/api/list)
        const response = await fetch("/api/list");
        // Parsing the response to JSON format
        const data = await response.json();
        // Setting the fetched data into the state
        setCryptoData(data);
      } catch (error) {
        // Logging any error that occurs during the fetch operation
        console.error("Error fetching crypto data:", error);
      } finally {
        // Setting loading state to false once the fetch operation is complete (successful or not)
        setLoading(false);
      }
    };

    // Calling the fetchList function to start the data fetching process
    fetchList();
  }, []); // The empty dependency array ensures that the effect runs only once when the component mounts

  return (
    // The main container for the component
    <aside className="w-80 bg-white p-6 rounded-lg shadow-lg ml-6 max-h-80 overflow-y-auto">
      {/* Heading for the list */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        List of Available Currencies
      </h2>

      {/* Conditional rendering based on loading state */}
      {loading ? (
        // Showing a loading message while the data is being fetched
        <p className="text-gray-500">Loading...</p>
      ) : cryptoData ? (
        // If data is fetched successfully, display the list of currencies in a grid layout
        <ul className="grid grid-cols-2 gap-2 text-gray-800">
          {/* Mapping over the fetched data and rendering each currency in a list item */}
          {cryptoData.map((currency, index) => (
            <li key={index} className="border p-2 rounded bg-gray-100">
              {/* Displaying the currency code in uppercase */}
              {currency.toUpperCase()}
            </li>
          ))}
        </ul>
      ) : (
        // If fetching the data fails, display an error message
        <p className="text-red-500">Failed to load data</p>
      )}
    </aside>
  );
};

// Exporting the CryptoCheck component to be used elsewhere in the app
export default CryptoCheck;
