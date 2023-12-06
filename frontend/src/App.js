import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navigation from "./components/layout/Navigation";
import Categoryproduct from "./components/category/Categoryproduct";
import NewProduct from "./pages/NewCar";
import AllCarsPage from "./pages/AllCarsPage";
import CarPage from "./pages/CarPage";
import Dashboard from "./pages/Dashboard";
import OrdersPage from "./pages/OrdersPage";
import ProfilePage from "./pages/ProfilePage";
// import Wishlist from "./components/Wishlist/Wishlist";
import CheckOutPage from "./pages/CheckOutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

import Footer from "./components/layout/Footer";
import { useSelector } from "react-redux";
import EditCarPage from "./pages/EditCarPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const user = useSelector((state) => state.user);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/order/success" element={<OrderSuccessPage />} />

          <Route path="/account/order/list" element={<OrdersPage />} />

          <Route path="/account/profile" element={<ProfilePage />} />

          <Route path="/product/:id" element={<CarPage />} />

          <Route path="/checkout" element={<CheckOutPage />} />

          <Route
            path="/makes/:make"
            element={<Categoryproduct searchTerm={searchTerm} />}
          />

          <Route path="/makes/all" element={<AllCarsPage />} />

          {user && user.isAdmin && (
            <>
              <Route path="/admin" element={<AdminDashboard />} />

              <Route path="/new-car" element={<NewProduct />} />
              <Route path="/product/:id/edit" element={<EditCarPage />} />
            </>
          )}
          {/* user routes  */}
          <Route path="/account/view" element={<Dashboard />} />

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
