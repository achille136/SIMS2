import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function Stockout() {
  const [records, setRecords] = useState([]);
  const [parts, setParts] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    SpId: "",
    StockOutQuantity: "",
    StockOutDate: "",
    StockOutUnitPrice: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadParts = async () => {
    try {
      const response = await fetch("http://localhost:5000/spare-parts");
      const data = await response.json();
      setParts(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load spare parts");
    }
  };

  const loadRecords = async () => {
    try {
      const response = await fetch("http://localhost:5000/stock-out");
      const data = await response.json();
      setRecords(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load records");
    }
  };

  useEffect(() => {
    loadParts();
    loadRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const payload = {
        ...form,
        SpId: Number(form.SpId),
        StockOutQuantity: Number(form.StockOutQuantity),
        StockOutUnitPrice: Number(form.StockOutUnitPrice),
      };

      const url = editingId
        ? `http://localhost:5000/stock-out/${editingId}`
        : "http://localhost:5000/stock-out";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to save record");
        return;
      }

      setMessage(data.message);
      setForm({ SpId: "", StockOutQuantity: "", StockOutDate: "", StockOutUnitPrice: "" });
      setEditingId(null);
      loadRecords();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  const handleEdit = (record) => {
    setEditingId(record.Stock_out_id);
    setForm({
      SpId: String(record.SpId),
      StockOutQuantity: String(record.StockOutQuantity),
      StockOutDate: record.StockOutDate?.split("T")[0] || "",
      StockOutUnitPrice: String(record.StockOutUnitPrice),
    });
    setMessage("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ SpId: "", StockOutQuantity: "", StockOutDate: "", StockOutUnitPrice: "" });
    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this record?");
    if (!confirmDelete) return;

    try {
      setMessage("");
      const response = await fetch(`http://localhost:5000/stock-out/${id}`, { method: "DELETE" });
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Delete failed");
        return;
      }

      setMessage(data.message);
      loadRecords();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <section className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">
            Stock Out
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            
          </p>
        </div>

        {/* FORM */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="bg-black px-8 py-6 text-white">
            <h2 className="text-2xl font-black">
              {editingId ? "Edit Stock Out Record" : "Add Stock Out Record"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Fill in the information below to register a stock out entry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-8">
            <div className="grid gap-6 md:grid-cols-2">

              {/* SPARE PART */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">Spare Part</label>
                <select
                  required
                  value={form.SpId}
                  onChange={(e) => setForm({ ...form, SpId: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                >
                  <option value="">Select spare part</option>
                  {parts.map((part) => (
                    <option key={part.SpId} value={part.SpId}>{part.Name}</option>
                  ))}
                </select>
              </div>

              {/* QUANTITY */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={form.StockOutQuantity}
                  onChange={(e) => setForm({ ...form, StockOutQuantity: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              {/* UNIT PRICE */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">Unit Price</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={form.StockOutUnitPrice}
                  onChange={(e) => setForm({ ...form, StockOutUnitPrice: e.target.value })}
                  placeholder="0"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>

              {/* DATE */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">Date</label>
                <input
                  type="date"
                  required
                  value={form.StockOutDate}
                  onChange={(e) => setForm({ ...form, StockOutDate: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-black focus:bg-white"
                />
              </div>
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800">
                {message}
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-black px-8 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
              >
                {editingId ? "Update Record" : "Save Record"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="rounded-2xl border border-slate-200 bg-slate-100 px-8 py-4 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-8 py-6">
            <h2 className="text-2xl font-black text-slate-900">Stock Out Records</h2>
            <p className="mt-1 text-sm text-slate-500">List of all registered stock out entries.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-5 font-black">ID</th>
                  <th className="px-6 py-5 font-black">Spare Part</th>
                  <th className="px-6 py-5 font-black">Quantity</th>
                  <th className="px-6 py-5 font-black">Unit Price</th>
                  <th className="px-6 py-5 font-black">Total</th>
                  <th className="px-6 py-5 font-black">Date</th>
                  <th className="px-6 py-5 font-black text-center">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.Stock_out_id} className="transition hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-500">
                      #{record.Stock_out_id}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">
                        {parts.find((part) => part.SpId === record.SpId)?.Name || "Unknown"}
                      </div>
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {record.StockOutQuantity}
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                    {record.StockOutUnitPrice}  RWF
                    </td>
                    <td className="px-6 py-5 text-lg font-black text-slate-900">
                    {record.StockOutTotalPrice}  RWF 
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-black px-4 py-2 text-xs font-black text-white">
                        {record.StockOutDate?.split("T")[0]}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(record)}
                          className="rounded-xl bg-slate-800 px-4 py-2 text-xs font-black text-white transition hover:bg-slate-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(record.Stock_out_id)}
                          className="rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-black text-slate-700 transition hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-5 text-3xl"></div>
                        <p className="font-bold text-slate-400">No stock out records found</p>
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