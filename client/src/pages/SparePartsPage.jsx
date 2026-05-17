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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to save spare part");
        return;
      }

      setMessage(data.message || "Spare part saved successfully");

      setForm({
        Name: "",
        Category: "",
        Quantity: "",
        UnitPrice: "",
      });

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
      <section className="grid gap-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Name
              <input
                name="Name"
                value={form.Name}
                required
                onChange={(e) =>
                  setForm({ ...form, Name: e.target.value })
                }
                placeholder="Enter spare part name"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Category
              <input
                name="Category"
                value={form.Category}
                required
                onChange={(e) =>
                  setForm({ ...form, Category: e.target.value })
                }
                placeholder="Enter category"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Quantity
              <input
                name="Quantity"
                type="number"
                min="1"
                value={form.Quantity}
                required
                onChange={(e) =>
                  setForm({ ...form, Quantity: e.target.value })
                }
                placeholder="0"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Unit Price
              <input
                name="UnitPrice"
                type="number"
                min="1"
                value={form.UnitPrice}
                required
                onChange={(e) =>
                  setForm({ ...form, UnitPrice: e.target.value })
                }
                placeholder="0"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          </div>

          {message && (
            <p className="mt-4 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
              {message}
            </p>
          )}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white hover:bg-blue-700"
            >
              Save Spare Part
            </button>
          </div>
        </form>

        <h2 className="text-2xl font-black tracking-tight text-slate-950">
          Manage Spare Parts
        </h2>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-black">Number</th>
                  <th className="px-5 py-4 font-black">Name</th>
                  <th className="px-5 py-4 font-black">Category</th>
                  <th className="px-5 py-4 font-black">Quantity</th>
                  <th className="px-5 py-4 font-black">Unit Price</th>
                  <th className="px-5 py-4 font-black">Total Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {spareParts.map((part) => (
                  <tr key={part.SpId}>
                    <td className="px-5 py-4 font-bold text-slate-500">
                      {part.SpId}
                    </td>

                    <td className="px-5 py-4 text-slate-950">
                      {part.Name}
                    </td>

                    <td className="px-5 py-4 text-slate-950">
                      {part.Category}
                    </td>

                    <td className="px-5 py-4 text-slate-950">
                      {part.Quantity}
                    </td>

                    <td className="px-5 py-4 text-slate-950">
                      {part.UnitPrice}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-950">
                      {part.TotalPrice}
                    </td>
                  </tr>
                ))}

                {spareParts.length === 0 && (
                  <tr>
                    <td
                      colSpan="6"
                      className="px-5 py-10 text-center font-bold text-slate-400"
                    >
                      No spare parts found
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