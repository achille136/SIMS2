import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function Dashboard() {
let [spareParts, setSpareParts] = useState([]);

useEffect(() => {
  let loadParts = async () => {
    let response = await fetch("http://localhost:1000/spare-parts");
    let data = await response.json();
    setSpareParts(data);
  };
  loadParts();
}, []);

  return (
    <DashboardLayout>
      <section className="grid gap-6">
    <h2>Manage Spare parts</h2>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {spareParts.map((part) => (
          <tr key={part.SpId}>
            <td>{part.SpId}</td>
            <td>{part.Name}</td>
            <td>{part.Quantity}</td>
            <td>{part.UnitPrice}</td>
            <td>{part.TotalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </section>
    </DashboardLayout>
  );
}
