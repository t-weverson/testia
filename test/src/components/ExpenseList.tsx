import React from 'react';
import { Eye } from 'lucide-react';
import { Expense } from '../types';
import { formatCurrency, calculateTotal } from '../utils';

interface ExpenseListProps {
  expenses: Expense[];
  onViewDetails: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onViewDetails }: ExpenseListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mês</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {expenses.map((expense) => {
            const total = calculateTotal({
              rent: expense.rent,
              electricity: expense.electricity,
              water: expense.water,
              creditCard1: expense.creditCard1,
              creditCard2: expense.creditCard2,
              creditCard3: expense.creditCard3,
              creditCard4: expense.creditCard4,
              creditCard5: expense.creditCard5,
              grocery: expense.grocery,
              streaming: expense.streaming,
              others: expense.others
            });

            return (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {expense.month}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatCurrency(total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onViewDetails(expense)}
                    className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detalhes
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}