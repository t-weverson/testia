import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Expense, ExpenseKey } from '../types';
import { formatCurrency, getMonthName } from '../utils';

const EXPENSE_LABELS: Record<ExpenseKey, string> = {
  rent: 'Aluguel',
  electricity: 'Energia',
  water: 'Água',
  creditCard1: 'Cartão 1',
  creditCard2: 'Cartão 2',
  creditCard3: 'Cartão 3',
  creditCard4: 'Cartão 4',
  creditCard5: 'Cartão 5',
  grocery: 'Supermercado',
  streaming: 'Streaming',
  others: 'Outros'
};

interface ExpenseFormProps {
  onSubmit: (expense: Omit<Expense, 'id'>) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [formData, setFormData] = useState<Record<ExpenseKey, number>>({
    rent: 0,
    electricity: 0,
    water: 0,
    creditCard1: 0,
    creditCard2: 0,
    creditCard3: 0,
    creditCard4: 0,
    creditCard5: 0,
    grocery: 0,
    streaming: 0,
    others: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      month: getMonthName(new Date()),
      ...formData
    });
    
    // Reset form
    setFormData({
      rent: 0,
      electricity: 0,
      water: 0,
      creditCard1: 0,
      creditCard2: 0,
      creditCard3: 0,
      creditCard4: 0,
      creditCard5: 0,
      grocery: 0,
      streaming: 0,
      others: 0
    });
  };

  const handleChange = (key: ExpenseKey, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: Number(value) || 0
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.keys(EXPENSE_LABELS) as ExpenseKey[]).map((key) => (
          <div key={key} className="space-y-2">
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">
              {EXPENSE_LABELS[key]}
            </label>
            <input
              type="number"
              id={key}
              value={formData[key] || ''}
              onChange={(e) => handleChange(key, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              min="0"
              step="0.01"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Salvar Despesas
        </button>
      </div>
    </form>
  );
}