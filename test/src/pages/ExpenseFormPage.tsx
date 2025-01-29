import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseForm } from '../components/ExpenseForm';
import { Expense } from '../types';

export function ExpenseFormPage() {
  const navigate = useNavigate();

  const handleSubmit = (expenseData: Omit<Expense, 'id'>) => {
    const expenses = JSON.parse(localStorage.getItem('expenses') || '[]');
    const newExpense = {
      ...expenseData,
      id: crypto.randomUUID()
    };
    
    localStorage.setItem('expenses', JSON.stringify([...expenses, newExpense]));
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Registrar Despesas Mensais</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}