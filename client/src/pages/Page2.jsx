import DashboardLayout from "../layouts/DashboardLayout";

const records = [
  { id: 1, name: "Amoxicillin", category: "Antibiotic", status: "Available", amount: "12,000 RWF" },
  { id: 2, name: "Paracetamol", category: "Pain relief", status: "Low stock", amount: "4,500 RWF" },
  { id: 3, name: "Cetirizine", category: "Allergy", status: "Available", amount: "6,800 RWF" },
  { id: 4, name: "Ibuprofen", category: "Pain relief", status: "Unavailable", amount: "7,200 RWF" }
];

const badgeClass = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Low stock": "bg-amber-50 text-amber-700 ring-amber-200",
  Unavailable: "bg-rose-50 text-rose-700 ring-rose-200"
};

export default function Page2() {
  return (
    <DashboardLayout>
      <section className="grid gap-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase tracking-[0.18em]" style={{ color: "#2563EB" }}>
            Page 2
          </p>
          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">Table Template</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                Use this for list/read screens. It stays clean on phones and tablets with horizontal overflow.
              </p>
            </div>
            <button className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white">Add New</button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-4 sm:p-5">
            <input
              placeholder="Search records..."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-black">ID</th>
                  <th className="px-5 py-4 font-black">Name</th>
                  <th className="px-5 py-4 font-black">Category</th>
                  <th className="px-5 py-4 font-black">Status</th>
                  <th className="px-5 py-4 font-black">Amount</th>
                  <th className="px-5 py-4 text-right font-black">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-bold text-slate-500">#{record.id}</td>
                    <td className="px-5 py-4 font-black text-slate-950">{record.name}</td>
                    <td className="px-5 py-4 text-slate-600">{record.category}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ring-1 ${badgeClass[record.status]}`}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-700">{record.amount}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-black text-slate-700 hover:bg-slate-50">Edit</button>
                        <button className="rounded-xl border border-rose-200 px-3 py-2 text-xs font-black text-rose-600 hover:bg-rose-50">Delete</button>
                      </div>
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
