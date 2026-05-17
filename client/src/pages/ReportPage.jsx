import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";

const DAILY_API = "http://localhost:1000/report/daily-stockout";
const STATUS_API = "http://localhost:1000/report/stock-status";

export default function Reports() {
  const [dailyReports, setDailyReports] = useState([]);
  const [stockStatus, setStockStatus] = useState([]);
  const [message, setMessage] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const loadDailyReports = async () => {
    try {
      let url = DAILY_API;

      if (startDate && endDate) {
        url = `${DAILY_API}?startDate=${startDate}&endDate=${endDate}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      setDailyReports(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load daily stock out report");
    }
  };

  const loadStockStatus = async () => {
    try {
      const res = await fetch(STATUS_API);
      const data = await res.json();

      setStockStatus(data);
    } catch (err) {
      console.log(err);
      setMessage("Failed to load stock status report");
    }
  };

  useEffect(() => {
    loadDailyReports();
    loadStockStatus();
  }, []);

  const filterReports = () => {
    loadDailyReports();
  };

  const printReport = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <section className="grid gap-6">

        <div className="flex justify-end">
          <button
            onClick={printReport}
            className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:opacity-90"
          >
            Print Report
          </button>
        </div>

        {message && (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
            {message}
          </p>
        )}

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-xl font-black text-slate-950">
              Daily Stock Out Report
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
              />

              <button
                onClick={filterReports}
                className="rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-black">ID</th>
                  <th className="px-5 py-4 font-black">Spare Part</th>
                  <th className="px-5 py-4 font-black">Quantity</th>
                  <th className="px-5 py-4 font-black">Date</th>
                  <th className="px-5 py-4 font-black">Unit Price</th>
                  <th className="px-5 py-4 font-black">Total Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {dailyReports.map((item) => (
                  <tr key={item.Stock_out_id} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-bold text-slate-500">
                      #{item.Stock_out_id}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-950">
                      {item.SparePartName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.StockOutQuantity}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.StockOutDate?.split("T")[0]}
                    </td>
                    <td className="px-5 py-4 font-bold text-slate-700">
                      {item.StockOutUnitPrice} RWF
                    </td>
                    <td className="px-5 py-4 font-black text-slate-950">
                      {item.StockOutTotalPrice} RWF
                    </td>
                  </tr>
                ))}

                {dailyReports.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No daily stock out records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h2 className="text-xl font-black text-slate-950">
              Stock Status Report
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Shows stored quantity, stock out quantity, and remaining quantity.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-black">ID</th>
                  <th className="px-5 py-4 font-black">Spare Part</th>
                  <th className="px-5 py-4 font-black">Stored</th>
                  <th className="px-5 py-4 font-black">Stock Out</th>
                  <th className="px-5 py-4 font-black">Remaining</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {stockStatus.map((item) => (
                  <tr key={item.SpId} className="hover:bg-slate-50/70">
                    <td className="px-5 py-4 font-bold text-slate-500">
                      #{item.SpId}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-950">
                      {item.SparePartName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.StoredQuantity}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {item.StockOutQuantity}
                    </td>
                    <td className="px-5 py-4 font-black text-slate-950">
                      {item.RemainingQuantity}
                    </td>
                  </tr>
                ))}

                {stockStatus.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-5 py-8 text-center text-slate-500">
                      No stock status records found.
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