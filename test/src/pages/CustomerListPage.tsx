import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Customer } from '../types';

export function CustomerListPage() {
  const [customers] = useState<Customer[]>(() => 
    JSON.parse(localStorage.getItem('customers') || '[]')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Lista de Clientes</h1>

      <div className="bg-white shadow-sm rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contato</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                    {customer.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {customer.contact}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button
                      onClick={() => setSelectedCustomer(customer)}
                      className="text-teal-600 hover:text-teal-900 inline-flex items-center transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Detalhes do Cliente
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Nome</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedCustomer.name}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Endereço</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedCustomer.address}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Contato</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedCustomer.contact}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Observações</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedCustomer.observations}</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}