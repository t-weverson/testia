import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import { Order, Customer, Product } from '../types';
import { formatCurrency } from '../utils';

export function OrderListPage() {
  const [orders] = useState<Order[]>(() => 
    JSON.parse(localStorage.getItem('orders') || '[]')
  );
  const [customers] = useState<Customer[]>(() => 
    JSON.parse(localStorage.getItem('customers') || '[]')
  );
  const [products] = useState<Product[]>(() => 
    JSON.parse(localStorage.getItem('products') || '[]')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getCustomerName = (customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Cliente não encontrado';
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Produto não encontrado';
  };

  const filteredOrders = orders.filter(order => 
    getCustomerName(order.customerId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Lista de Pedidos</h1>

      <div className="bg-white shadow-sm rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por cliente..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                    {getCustomerName(order.customerId)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status === 'completed' ? 'Concluído' :
                       order.status === 'cancelled' ? 'Cancelado' :
                       'Pendente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => setSelectedOrder(order)}
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

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Detalhes do Pedido
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
              <div>
                <dt className="text-sm font-medium text-slate-500">Cliente</dt>
                <dd className="mt-1 text-sm text-slate-700">{getCustomerName(selectedOrder.customerId)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Data</dt>
                <dd className="mt-1 text-sm text-slate-700">{formatDate(selectedOrder.createdAt)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Status</dt>
                <dd className="mt-1 text-sm text-slate-700">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedOrder.status === 'completed' ? 'bg-green-100 text-green-800' :
                    selectedOrder.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {selectedOrder.status === 'completed' ? 'Concluído' :
                     selectedOrder.status === 'cancelled' ? 'Cancelado' :
                     'Pendente'}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Itens do Pedido</dt>
                <dd className="mt-1">
                  <ul className="divide-y divide-slate-200">
                    {selectedOrder.items.map((item, index) => (
                      <li key={index} className="py-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-700">
                            {getProductName(item.productId)} x {item.quantity}
                          </span>
                          <span className="text-sm text-slate-600">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Total</dt>
                <dd className="mt-1 text-sm font-medium text-slate-700">{formatCurrency(selectedOrder.total)}</dd>
              </div>
              {selectedOrder.observations && (
                <div>
                  <dt className="text-sm font-medium text-slate-500">Observações</dt>
                  <dd className="mt-1 text-sm text-slate-700">{selectedOrder.observations}</dd>
                </div>
              )}
            </dl>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedOrder(null)}
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