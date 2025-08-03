import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// auth component
import Header from './pages/header/Header';
import Signin from './pages/auth/components/SignIn/Signin';
import Signup from './pages/auth/components/SignUp/Signup';

//admin component
import AdminDashboard from './pages/admin/components/AdminDashboard';
import PostBook from './pages/admin/components/PostBook';
import EditBook from './pages/admin/components/EditBook';
import Orders from './pages/admin/components/Orders';

//customer component
import CustomerDashboard from './pages/customer/components/CustomerDashboard';
import Cart from './pages/customer/components/Cart';
import CustomerOrders from './pages/customer/components/CustomerOrders';


function App() {
  return (
    <>

    <BrowserRouter>
        <Header />
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
          {/* auth */}
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
        
          {/* admin component */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/book/post" element={<PostBook />} />
          <Route path="/admin/book/:id/edit" element={<EditBook />} />
          <Route path="/admin/book/orders" element={<Orders />} />

          {/* customer component */}
          <Route path="/customer/dashboard" element={<CustomerDashboard />} />
          <Route path="/customer/cart" element={<Cart />} />
          <Route path="/customer/orders" element={<CustomerOrders />} />

        </Routes>
    </BrowserRouter>
    </>

  );
}

export default App;
