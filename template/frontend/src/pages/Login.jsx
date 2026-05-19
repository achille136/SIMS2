import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";
import { saveUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    Username: "",
    Password: ""
  });

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const login = async () => {
    try {
      const res = await api.post("/auth/login", form);

      saveUser(res.data);

      navigate("/");
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4">
      <section className="w-full max-w-sm rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
        
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-black text-gray-900">
            Login
          </h1>

          <p className="text-sm text-gray-500">
          
          </p>
        </div>

        <div className="grid gap-5">
          <input
            type="text"
            name="Username"
            placeholder="Username"
            value={form.Username}
            onChange={handleChange}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition duration-200 focus:border-blue-600 focus:bg-white"
          />

          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={form.Password}
            onChange={handleChange}
            className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm outline-none transition duration-200 focus:border-blue-600 focus:bg-white"
          />

          {message && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500">
              {message}
            </p>
          )}

          <button
            onClick={login}
            className="rounded-2xl bg-black py-4 text-sm font-bold text-white transition duration-200 hover:scale-[1.02] hover:bg-gray-900"
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
}