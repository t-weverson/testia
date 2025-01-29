import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ProductFormPage } from './pages/ProductFormPage';
import { ProductListPage } from './pages/ProductListPage';
import { CustomerFormPage } from './pages/CustomerFormPage';
import { CustomerListPage } from './pages/CustomerListPage';
import { OrderFormPage } from './pages/OrderFormPage';
import { OrderListPage } from './pages/OrderListPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/new" element={<ProductFormPage />} />
            <Route path="/customers" element={<CustomerListPage />} />
            <Route path="/customers/new" element={<CustomerFormPage />} />
            <Route path="/orders" element={<OrderListPage />} />
            <Route path="/orders/new" element={<OrderFormPage />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App