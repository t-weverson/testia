import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { ProductFormData } from '../types';
import { generateProductCode } from '../utils';

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
}

export function ProductForm({ initialData, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(initialData || {
    code: generateProductCode(),
    name: '',
    description: '',
    costPrice: 0,
    finalPrice: 0,
    brand: '',
    supplier: '',
    stockQuantity: 0,
    stockLocation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof ProductFormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-slate-700">
            Código do Produto
          </label>
          <input
            type="text"
            id="code"
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nome do Produto
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-slate-700">
            Descrição do Produto
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="costPrice" className="block text-sm font-medium text-slate-700">
            Valor de Custo
          </label>
          <input
            type="number"
            id="costPrice"
            value={formData.costPrice}
            onChange={(e) => handleChange('costPrice', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="finalPrice" className="block text-sm font-medium text-slate-700">
            Valor Final
          </label>
          <input
            type="number"
            id="finalPrice"
            value={formData.finalPrice}
            onChange={(e) => handleChange('finalPrice', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-slate-700">
            Marca
          </label>
          <input
            type="text"
            id="brand"
            value={formData.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="supplier" className="block text-sm font-medium text-slate-700">
            Fornecedor
          </label>
          <input
            type="text"
            id="supplier"
            value={formData.supplier}
            onChange={(e) => handleChange('supplier', e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="stockQuantity" className="block text-sm font-medium text-slate-700">
            Quantidade em Estoque
          </label>
          <input
            type="number"
            id="stockQuantity"
            value={formData.stockQuantity}
            onChange={(e) => handleChange('stockQuantity', Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            min="0"
            required
          />
        </div>

        <div>
          <label htmlFor="stockLocation" className="block text-sm font-medium text-slate-700">
            Local de Estoque
          </label>
          <input
            type="text"
            id="stockLocation"
            value={formData.stockLocation}
            onChange={(e) => handleChange('stockLocation', e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            required
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Produto
        </button>
      </div>
    </form>
  );
}