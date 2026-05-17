import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function Stockin() {
let [records, setRecords] = useState([]);
let [parts, setParts] = useState([]);
  const [form, setForm] = useState({
    SpId: "",
    StockInQuantity: "",
    StockInDate: "",
  });

   let loadParts = async () => {
    let response = await fetch("http://localhost:1000/spare-parts");
    let data = await response.json();
    setParts(data);
  };

  let loadRecords = async () => {
    let response = await fetch("http://localhost:1000/stock-in");
    let data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
  loadParts();
  loadRecords();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  let response = await fetch("http://localhost:1000/stock-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }); 
loadRecords()

  };



  return (
    <DashboardLayout>
      <section className="grid gap-6">
             <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
              Spare part
              <select name="SpId" value={form.SpId} onChange={(e) => setForm({ ...form, SpId: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Select spare part</option>
                {parts.map((part) => (
                  <option key={part.SpId} value={part.SpId}>
                    {part.Name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Stock In Quantity
              <input name="StockInQuantity" type="number" value={form.StockInQuantity} onChange={(e) => setForm({ ...form, StockInQuantity: e.target.value })} placeholder="0" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>

              <label className="grid gap-2 text-sm font-bold text-slate-700">
              Date
              <input name="StockInDate" type="date" value={form.StockInDate} onChange={(e) => setForm({ ...form, StockInDate: e.target.value })} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

            <button type="submit" className="rounded-2xl px-6 py-3 text-sm font-black text-white" style={{ background: "#2563EB" }}>
              Save Record
            </button>
          </div>
        </form>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Manage Stock In Records</h2>
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">

<div className="overflow-x-auto">
      <table className="min-w-[760px] w-full text-left text-sm">
      <thead  className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
        <tr>
          <th className="px-5 py-4 font-black">ID</th>
              <th className="px-5 py-4 font-black">Spare part</th>
          <th className="px-5 py-4 font-black">Stock in Quantity</th>
          <th className="px-5 py-4 font-black">Stock In Date</th>
      
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100">
        {records.map((record) => (
          <tr key={record.Stock_in_id}>
            <td className="px-5 py-4 font-bold text-slate-500">{record.Stock_in_id}</td>
             <td className="px-5 py-4 text-slate-950">{parts.find(part => part.SpId === record.SpId)?.Name || "Unknown Part"}</td>
            <td className="px-5 py-4  text-slate-950">{record.StockInQuantity}</td>
<td className="px-5 py-4  text-slate-950">
  {record.StockInDate?.split("T")[0]}
</td>
           
 
          </tr>
        ))}
      </tbody>
    </table>
</div>
</div>
      </section>
    </DashboardLayout>
  );
}
