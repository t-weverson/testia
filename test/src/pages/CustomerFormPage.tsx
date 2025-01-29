import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomerFormData } from '../types';

export function CustomerFormPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const customerData: CustomerFormData = {
      name: formData.get('name') as string,
      address: formData.get('address') as string,
      contact: formData.get('contact') as string,
      observations: formData.get('observations') as string,
    };

    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    const newCustomer = {
      ...customerData,
      id: crypto.randomUUID()
    };
    
    localStorage.setItem('customers', JSON.stringify([...customers, newCustomer]));
    navigate('/customers');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Cadastrar Novo Cliente</h1>
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                Nome do Cliente
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700">
                Endereço
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-slate-700">
                Contato
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                required
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="observations" className="block text-sm font-medium text-slate-700">
                Observações
              </label>
              <textarea
                id="observations"
                name="observations"
                rows={3}
                className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Salvar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}