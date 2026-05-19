import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Page1() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    role: "student",
    level: "",
    date: "",
    amount: "",
    description: "",
    active: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted. Connect this to your API.");
  };

  return (
    <DashboardLayout>
      <section className="grid gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: "#2563EB" }}>
            Page 1
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Form Template</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Copy this page for create/update screens. It includes text, email, select, number, date, textarea, and checkbox inputs.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:p-8">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Full name
              <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Enter full name" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Role
              <select name="role" value={form.role} onChange={handleChange} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="staff">Staff</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Level
              <select name="level" value={form.level} onChange={handleChange} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400">
                <option value="">Select level</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Date
              <input name="date" type="date" value={form.date} onChange={handleChange} className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Amount
              <input name="amount" type="number" value={form.amount} onChange={handleChange} placeholder="0" className="rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>

            <label className="grid gap-2 text-sm font-bold text-slate-700 md:col-span-2">
              Description
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" placeholder="Write extra details here..." className="resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400" />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
              <input name="active" type="checkbox" checked={form.active} onChange={handleChange} className="h-4 w-4 rounded" />
              Mark record as active
            </label>

            <button type="submit" className="rounded-2xl px-6 py-3 text-sm font-black text-white" style={{ background: "#2563EB" }}>
              Save Record
            </button>
          </div>
        </form>
      </section>
    </DashboardLayout>
  );
}
