import DashboardLayout from "../layouts/DashboardLayout";
import { useState, useEffect } from "react";

export default function SpareParts() {
  const [spareParts, setSpareParts] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    Name: "",
    Category: "",
    Quantity: "",
    UnitPrice: "",
  });

  const loadParts = async () => {
    try {
      const response = await fetch("http://localhost:5000/spare-parts");
      const data = await response.json();
      setSpareParts(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load spare parts");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const name = form.Name.trim();
    const category = form.Category.trim();
    const quantity = Number(form.Quantity);
    const unitPrice = Number(form.UnitPrice);

    if (!name) return setMessage("Spare part name is required");
    if (!isNaN(name)) return setMessage("Spare part name cannot be only numbers");
    if (!category) return setMessage("Category is required");
    if (quantity <= 0) return setMessage("Quantity must be greater than zero");
    if (unitPrice <= 0) return setMessage("Unit price must be greater than zero");

    const payload = {
      Name: name,
      Category: category,
      Quantity: quantity,
      UnitPrice: unitPrice,
    };

    try {
      const response = await fetch("http://localhost:5000/spare-parts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to save spare part");
        return;
      }

      setMessage(data.message || "Spare part saved successfully");
      setForm({ Name: "", Category: "", Quantity: "", UnitPrice: "" });
      loadParts();
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong");
    }
  };

  useEffect(() => {
    loadParts();
  }, []);

  return (
    <DashboardLayout>
      <section className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              Spare Parts
            </h1>
            <p className="mt-2 text-sm text-slate-500">
            
            </p>
          </div>


        </div>

        {/* FORM */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="bg-black px-8 py-6 text-white">
            <h2 className="text-2xl font-black">Add Spare Part</h2>
            <p className="mt-1 text-sm text-blue-100">
              Fill in the information below to register a new spare part.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-6 p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {/* NAME */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Spare Part Name
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                  <input
                    type="text"
                    value={form.Name}
                    required
                    onChange={(e) => setForm({ ...form, Name: e.target.value })}
                    placeholder="Brake Pads"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Category
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                  <input
                    type="text"
                    value={form.Category}
                    required
                    onChange={(e) => setForm({ ...form, Category: e.target.value })}
                    placeholder="Engine"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* QUANTITY */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Quantity
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                  <input
                    type="number"
                    min="1"
                    value={form.Quantity}
                    required
                    onChange={(e) => setForm({ ...form, Quantity: e.target.value })}
                    placeholder="0"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* UNIT PRICE */}
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">
                  Unit Price
                </label>
                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-blue-500 focus-within:bg-white">
                  <input
                    type="number"
                    min="1"
                    value={form.UnitPrice}
                    required
                    onChange={(e) => setForm({ ...form, UnitPrice: e.target.value })}
                    placeholder="0"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            {message && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-semibold text-slate-800">
                {message}
              </div>
            )}

            {/* BUTTON */}
            <div className="pt-2">
              <button
                type="submit"
                className="rounded-2xl bg-black px-8 py-4 text-sm font-black text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
              >
                Save Spare Part
              </button>
            </div>
          </form>
        </div>

        {/* TABLE */}
        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Spare Parts Inventory
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                List of all registered spare parts.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-5 font-black">ID</th>
                  <th className="px-6 py-5 font-black">Name</th>
                  <th className="px-6 py-5 font-black">Category</th>
                  <th className="px-6 py-5 font-black">Quantity</th>
                  <th className="px-6 py-5 font-black">Unit Price</th>
                  <th className="px-6 py-5 font-black">Total Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {spareParts.map((part) => (
                  <tr key={part.SpId} className="transition hover:bg-slate-50">
                    <td className="px-6 py-5 font-bold text-slate-500">
                      #{part.SpId}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-slate-900">{part.Name}</div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-black px-4 py-2 text-xs font-black text-white">
                        {part.Category}
                      </span>
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                      {part.Quantity}
                    </td>
                    <td className="px-6 py-5 font-semibold text-slate-700">
                     {part.UnitPrice} RWF
                    </td>
                    <td className="px-6 py-5 text-lg font-black text-slate-900">
                     {part.TotalPrice} RWF
                    </td>
                  </tr>
                ))}

                {spareParts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="rounded-full bg-slate-100 p-5 text-3xl">
                          
                        </div>
                        <p className="font-bold text-slate-400">
                          No spare parts found
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