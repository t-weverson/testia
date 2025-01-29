import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, PlusCircle, Users, ShoppingCart, ClipboardList } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-slate-200">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <h1 className="text-xl font-bold text-slate-800">Sistema de Gestão</h1>
        </div>
        <nav className="p-4 space-y-2">
          <div className="px-3 py-2">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Produtos</h2>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/products"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <Package className="w-5 h-5 mr-3" />
                Lista de Produtos
              </NavLink>
              <NavLink
                to="/products/new"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                Cadastrar Produto
              </NavLink>
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Clientes</h2>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/customers"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <Users className="w-5 h-5 mr-3" />
                Lista de Clientes
              </NavLink>
              <NavLink
                to="/customers/new"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <PlusCircle className="w-5 h-5 mr-3" />
                Cadastrar Cliente
              </NavLink>
            </div>
          </div>

          <div className="px-3 py-2">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pedidos</h2>
            <div className="mt-2 space-y-1">
              <NavLink
                to="/orders"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <ClipboardList className="w-5 h-5 mr-3" />
                Lista de Pedidos
              </NavLink>
              <NavLink
                to="/orders/new"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`
                }
              >
                <ShoppingCart className="w-5 h-5 mr-3" />
                Novo Pedido
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}