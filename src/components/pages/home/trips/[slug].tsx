// File: /pages/home/trips/[slug].tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const TripDetailPage = () => {
  const router = useRouter();
  const { slug } = router.query; // Retrieves the dynamic segment from the URL

  const [tripType, setTripType] = useState("aller");
  const [vehicleType, setVehicleType] = useState("4x4");
  const [total, setTotal] = useState<number | null>(null);

  // Pricing data for calculations
  const pricing: { [key: string]: { aller: number; aller_retour: number } } = {
    "4x4": { aller: 400, aller_retour: 800 },
    minivan: { aller: 500, aller_retour: 1000 },
  };

  // Handle form submission and calculate total cost
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const cost = pricing[vehicleType][tripType];
//     setTotal(cost);
//   };

  // Wait until the router query is populated (slug is available)
  if (!slug) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Trip Details for <span className="text-blue-600">{slug}</span>
      </h1>
      <form  className="space-y-4">
        {/* Trip Type Selection */}
        <div>
          <label className="block mb-1 font-medium">Trip Type</label>
          <select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="aller">Aller</option>
            <option value="aller_retour">Aller-Retour</option>
          </select>
        </div>

        {/* Vehicle Type Selection */}
        <div>
          <label className="block mb-1 font-medium">Vehicle Type</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="4x4">4x4 Vehicle (400dh for aller)</option>
            <option value="minivan">
              Mini Van - 7 seats (500dh for aller)
            </option>
          </select>
        </div>

        {/* Calculate Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Calculate Total
        </button>
      </form>

      {/* Display the calculated total */}
      {total !== null && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 rounded">
          <p className="text-xl font-semibold">
            Total Cost: <span>{total} Dhs</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
