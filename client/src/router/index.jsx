import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/Login";
import Page1 from "../pages/Page1";
import Page2 from "../pages/Page2";
import Page3 from "../pages/Page3";
import SpareParts from "../pages/SparePartsPage";
import Stockin from "../pages/StockinPage";
import Stockout from "../pages/StockoutPage";
import Reports from "../pages/ReportPage";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <SpareParts />
          </ProtectedRoute>
        } />

        <Route path="/stockin" element={
          <ProtectedRoute>
            <Stockin />
          </ProtectedRoute>
        } />

        <Route path="/stockout" element={
          <ProtectedRoute>
            <Stockout />
          </ProtectedRoute>
        } />

        <Route path="/reports" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
