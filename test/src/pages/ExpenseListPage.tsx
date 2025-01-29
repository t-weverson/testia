import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import { ExpenseList } from '../components/ExpenseList';
import { ExpenseChart } from '../components/ExpenseChart';
import { Expense } from '../types';
import { formatCurrency } from '../utils';

export function ExpenseListPage() {
  const expenses: Expense[] = JSON.parse(localStorage.getItem('expenses') || '[]');
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Visão Geral de Despesas</h1>
        <Link
          to="/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Nova Despesa
        </Link>
      </div>

      {expenses.length > 0 ? (
        <>
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Gráfico de Despesas</h2>
            <ExpenseChart expenses={expenses} />
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Lista de Despesas</h2>
            <ExpenseList
              expenses={expenses}
              onViewDetails={setSelectedExpense}
            />
          </div>

          {selectedExpense && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Detalhes de {selectedExpense.month}
                </h3>
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Aluguel</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.rent)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Energia</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.electricity)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Água</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.water)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cartão 1</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.creditCard1)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cartão 2</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.creditCard2)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cartão 3</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.creditCard3)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cartão 4</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.creditCard4)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Cartão 5</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.creditCard5)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Supermercado</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.grocery)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Streaming</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.streaming)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Outros</dt>
                    <dd className="mt-1 text-sm text-gray-900">{formatCurrency(selectedExpense.others)}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={() => setSelectedExpense(null)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                  >
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Nenhuma despesa registrada ainda.</p>
        </div>
      )}
    </div>
  );
}