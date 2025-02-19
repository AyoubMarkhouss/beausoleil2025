// Full Final Code of the Transfer Form Component (Corrected)
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

// Types
type Vehicle = { name: string; aller: number; aller_retour: number };
type TripData = { vehicles: Vehicle[] };

// Trip Data
const tripOptions: Record<string, TripData> = {
  "casa-apt": {
    vehicles: [
      { name: "4x4", aller: 400, aller_retour: 700 },
      { name: "Mini Van 7 places", aller: 500, aller_retour: 800 },
    ],
  },
  "casa-marrakech": {
    vehicles: [
      { name: "4x4", aller: 1800, aller_retour: 2500 },
      { name: "Mini Van 7 places", aller: 2000, aller_retour: 2500 },
    ],
  },
};

const TransferForm = () => {
  const params = useParams();
  const slug = Array.isArray(params?.slug)
    ? params.slug[0].toLowerCase().replace("_", "-")
    : params?.slug?.toLowerCase().replace("_", "-");
  const tripData = tripOptions[slug || ""];

  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [tripType, setTripType] = useState("aller");
  const [amount, setAmount] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const vehicle = tripData?.vehicles.find((v) => v.name === selectedVehicle);
    setAmount(
      vehicle
        ? tripType === "aller"
          ? vehicle.aller
          : vehicle.aller_retour
        : 0
    );
  }, [selectedVehicle, tripType, tripData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/cmi-pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, fullName, email, phone }),
    });
    const html = await res.text();
    document.open();
    document.write(html);
    document.close();
  };

  if (!tripData)
    return <p className="text-red-500">Voyage introuvable. Vérifiez l'URL.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: "Full Name", value: fullName, setValue: setFullName },
        { label: "Email", value: email, setValue: setEmail, type: "email" },
        { label: "Phone", value: phone, setValue: setPhone, type: "tel" },
      ].map(({ label, value, setValue, type = "text" }) => (
        <input
          key={label}
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type={type}
          className="border p-2 w-full"
          required
        />
      ))}
      <select
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="">Sélectionner un véhicule</option>
        {tripData.vehicles.map((vehicle) => (
          <option key={vehicle.name} value={vehicle.name}>
            {vehicle.name}
          </option>
        ))}
      </select>
      <select
        value={tripType}
        onChange={(e) => setTripType(e.target.value)}
        className="border p-2 w-full"
        required
      >
        <option value="aller">Aller</option>
        <option value="aller_retour">Aller-Retour</option>
      </select>
      <p className="text-xl font-semibold">Prix total : {amount} Dhs</p>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full"
      >
        Payer avec CMI
      </button>
    </form>
  );
};

export default TransferForm;
