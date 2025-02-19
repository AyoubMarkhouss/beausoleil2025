// app/pay/page.tsx
"use client";

import { useState } from "react";

export default function PayPage() {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    const res = await fetch("/api/cmi-pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: "10.60",
        email: "customer@example.com",
        tel: "0612345678",
        BillToName: "John Doe",
      }),
    });
    const html = await res.text();
    // Write the returned HTML to the document to redirect the user
    document.open();
    document.write(html);
    document.close();
  };

  return (
    <div>
      <h1>Pay with CMI</h1>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
