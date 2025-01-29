import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductForm } from '../components/ProductForm';
import { ProductFormData } from '../types';

export function ProductFormPage() {
  const navigate = useNavigate();

  const handleSubmit = (productData: ProductFormData) => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const newProduct = {
      ...productData,
      id: crypto.randomUUID()
    };
    
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    navigate('/products');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Cadastrar Novo Produto</h1>
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-6">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}