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
    let response = await fetch("http://localhost:5000/spare-parts");
    let data = await response.json();
    setParts(data);
  };

  let loadRecords = async () => {
    let response = await fetch("http://localhost:5000/stock-in");
    let data = await response.json();
    setRecords(data);
  };

  useEffect(() => {
    loadParts();
    loadRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/stock-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    loadRecords();
  };

  return (
    <DashboardLayout>
      <section className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Stock In
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            
          </p>
        </div>

        {/* FORM */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="bg-black px-8 py-6 text-white">
            <h2 className="text-2xl font-black">Add Stock In Record</h2>
            <p className="mt-1 text-sm text-slate-400">
              
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-8">
            <div className="grid gap-6 md:grid-cols-2">

              {/* SPARE PART */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Spare Part
                </label>
                <select
                  value={form.SpId}
                  onChange={(e) => setForm({ ...form, SpId: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                >
                  <option value="">Select spare part</option>
                  {parts.map((part) => (
                    <option key={part.SpId} value={part.SpId}>
                      {part.Name}
                    </option>
                  ))}
                </select>
              </div>

              {/* QUANTITY */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Stock In Quantity
                </label>
                <input
                  type="number"
                  value={form.StockInQuantity}
                  onChange={(e) => setForm({ ...form, StockInQuantity: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              {/* DATE */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Date
                </label>
                <input
                  type="date"
                  value={form.StockInDate}
                  onChange={(e) => setForm({ ...form, StockInDate: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-black px-8 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
              >
                Save Record
              </button>
            </div>
          </form>
        </div>

        {}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900">
              Stock In Records
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              List of all registered stock in entries.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-5 font-black">ID</th>
                  <th className="px-6 py-5 font-black">Spare Part</th>
                  <th className="px-6 py-5 font-black">Quantity</th>
                  <th className="px-6 py-5 font-black">Date</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.Stock_in_id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-500">
                      #{record.Stock_in_id}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">
                        {parts.find((part) => part.SpId === record.SpId)?.Name || "Unknown Part"}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {record.StockInQuantity}
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-black px-4 py-2 text-xs font-black text-white">
                        {record.StockInDate?.split("T")[0]}
                      </span>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan="4" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-5 text-3xl">
                          
                        </div>
                        <p className="font-bold text-slate-400">
                          No stock in records found
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </section>
    </DashboardLayout>
  );
}