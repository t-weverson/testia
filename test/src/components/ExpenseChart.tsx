import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Expense } from '../types';
import { formatCurrency, calculateTotal } from '../utils';

interface ExpenseChartProps {
  expenses: Expense[];
}

export function ExpenseChart({ expenses }: ExpenseChartProps) {
  const data = expenses.map(expense => ({
    name: expense.month,
    total: calculateTotal({
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
    })
  }));

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
          <Bar dataKey="total" fill="#3B82F6" name="Total de Gastos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}