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
      const response = await fetch(
        "http://localhost:1000/spare-parts"
      );

      const data = await response.json();
      setParts(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load spare parts");
    }
  };

  const loadRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:1000/stock-out"
      );

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
        ? `http://localhost:1000/stock-out/${editingId}`
        : "http://localhost:1000/stock-out";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to save record");
        return;
      }

      setMessage(data.message);

      setForm({
        SpId: "",
        StockOutQuantity: "",
        StockOutDate: "",
        StockOutUnitPrice: "",
      });

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
      StockOutDate:
        record.StockOutDate?.split("T")[0] || "",
      StockOutUnitPrice: String(
        record.StockOutUnitPrice
      ),
    });

    setMessage("");
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setForm({
      SpId: "",
      StockOutQuantity: "",
      StockOutDate: "",
      StockOutUnitPrice: "",
    });

    setMessage("");
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) return;

    try {
      setMessage("");

      const response = await fetch(
        `http://localhost:1000/stock-out/${id}`,
        {
          method: "DELETE",
        }
      );

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
      <section className="grid gap-6">
        <form
          onSubmit={handleSubmit}
          className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Spare Part

              <select
                required
                value={form.SpId}
                onChange={(e) =>
                  setForm({
                    ...form,
                    SpId: e.target.value,
                  })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              >
                <option value="">
                  Select spare part
                </option>

                {parts.map((part) => (
                  <option
                    key={part.SpId}
                    value={part.SpId}
                  >
                    {part.Name}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Quantity

              <input
                type="number"
                min="1"
                required
                value={form.StockOutQuantity}
                onChange={(e) =>
                  setForm({
                    ...form,
                    StockOutQuantity: e.target.value,
                  })
                }
                placeholder="0"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Unit Price

              <input
                type="number"
                min="0"
                required
                value={form.StockOutUnitPrice}
                onChange={(e) =>
                  setForm({
                    ...form,
                    StockOutUnitPrice: e.target.value,
                  })
                }
                placeholder="0"
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Date

              <input
                type="date"
                required
                value={form.StockOutDate}
                onChange={(e) =>
                  setForm({
                    ...form,
                    StockOutDate: e.target.value,
                  })
                }
                className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </label>
          </div>

          {message && (
            <div className="mt-5 rounded-2xl bg-slate-100 px-4 py-3 text-sm font-bold text-slate-700">
              {message}
            </div>
          )}

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-black text-white transition hover:bg-blue-700"
            >
              {editingId
                ? "Update Record"
                : "Save Record"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-2xl bg-slate-200 px-6 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <div>
          <h2 className="text-3xl font-black text-slate-950">
            Stock Out Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage all stock out operations
          </p>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-black">
                    ID
                  </th>

                  <th className="px-5 py-4 font-black">
                    Spare Part
                  </th>

                  <th className="px-5 py-4 font-black">
                    Quantity
                  </th>

                  <th className="px-5 py-4 font-black">
                    Unit Price
                  </th>

                  <th className="px-5 py-4 font-black">
                    Total
                  </th>

                  <th className="px-5 py-4 font-black">
                    Date
                  </th>

                  <th className="px-5 py-4 font-black text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr
                    key={record.Stock_out_id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-bold text-slate-500">
                      {record.Stock_out_id}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {parts.find(
                        (part) =>
                          part.SpId === record.SpId
                      )?.Name || "Unknown"}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {record.StockOutQuantity}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {record.StockOutUnitPrice}
                    </td>

                    <td className="px-5 py-4 font-black text-slate-900">
                      {record.StockOutTotalPrice}
                    </td>

                    <td className="px-5 py-4 text-slate-700">
                      {record.StockOutDate?.split("T")[0]}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() =>
                            handleEdit(record)
                          }
                          className="rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-white transition hover:bg-amber-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              record.Stock_out_id
                            )
                          }
                          className="rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {records.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-5 py-10 text-center font-semibold text-slate-400"
                    >
                      No stock out records found
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