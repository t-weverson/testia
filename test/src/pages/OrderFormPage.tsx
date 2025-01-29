import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Customer, Product, OrderItem } from '../types';
import { formatCurrency } from '../utils';

export function OrderFormPage() {
  const navigate = useNavigate();
  const [customers] = useState<Customer[]>(() => 
    JSON.parse(localStorage.getItem('customers') || '[]')
  );
  const [products] = useState<Product[]>(() => 
    JSON.parse(localStorage.getItem('products') || '[]')
  );
  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [items, setItems] = useState<OrderItem[]>([]);
  const [observations, setObservations] = useState('');

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    if (field === 'productId') {
      const product = products.find(p => p.id === value);
      newItems[index] = {
        ...newItems[index],
        [field]: value,
        price: product ? product.finalPrice : 0
      };
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value
      };
    }
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || items.length === 0) return;

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: crypto.randomUUID(),
      customerId: selectedCustomerId,
      items,
      total: calculateTotal(),
      status: 'pending',
      createdAt: new Date().toISOString(),
      observations
    };
    
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    navigate('/orders');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Novo Pedido</h1>
      <div className="bg-white shadow-sm rounded-lg border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-slate-700">
              Cliente
            </label>
            <select
              id="customer"
              value={selectedCustomerId}
              onChange={(e) => setSelectedCustomerId(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            >
              <option value="">Selecione um cliente</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-slate-700">Itens do Pedido</h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Item
              </button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <select
                      value={item.productId}
                      onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                      required
                      className="block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                    >
                      <option value="">Selecione um produto</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
                          {product.name} - {formatCurrency(product.finalPrice)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-32">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      min="1"
                      required
                      className="block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                      placeholder="Qtd"
                    />
                  </div>
                  <div className="w-32">
                    <input
                      type="text"
                      value={formatCurrency(item.price * item.quantity)}
                      readOnly
                      className="block w-full rounded-md border-slate-200 bg-slate-50 shadow-sm sm:text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="p-2 text-rose-600 hover:text-rose-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {items.length > 0 && (
              <div className="mt-4 flex justify-end">
                <div className="text-lg font-medium text-slate-700">
                  Total: {formatCurrency(calculateTotal())}
                </div>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="observations" className="block text-sm font-medium text-slate-700">
              Observações
            </label>
            <textarea
              id="observations"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-slate-200 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
            >
              Finalizar Pedido
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}