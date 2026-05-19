import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { clearUser } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {}

    clearUser();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center gap-3 border-b border-slate-200 bg-white px-6 py-4 shadow-sm">
      <h1 className="mr-6 text-lg font-black text-slate-950">
        Inventory
      </h1>

      <Link
        to="/"
        className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
      >
        SpareParts
      </Link>

      <Link
        to="/stockin"
        className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
      >
        StockIn
      </Link>

      <Link
        to="/stockout"
        className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
      >
        StockOut
      </Link>

      <Link
        to="/reports"
        className="rounded-xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
      >
        Reports
      </Link>

      <button
        onClick={logout}
        className="ml-auto rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:opacity-90"
      >
        Logout
      </button>
    </nav>
  );
}