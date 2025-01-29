import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { ProductList } from '../components/ProductList';
import { Product } from '../types';
import { formatCurrency } from '../utils';

export function ProductListPage() {
  const [products] = useState<Product[]>(() => 
    JSON.parse(localStorage.getItem('products') || '[]')
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      const updatedProducts = products.filter(p => p.id !== productToDelete.id);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      window.location.reload();
    }
    setProductToDelete(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-700 mb-8">Lista de Produtos</h1>

      <div className="bg-white shadow-sm rounded-lg border border-slate-200">
        <div className="p-6 border-b border-slate-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>

        <ProductList
          products={filteredProducts}
          onView={setSelectedProduct}
          onEdit={(product) => {/* Implement edit functionality */}}
          onDelete={handleDelete}
        />
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl w-full">
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Detalhes do Produto
            </h3>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-slate-500">Código</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.code}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Nome</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.name}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-slate-500">Descrição</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.description}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Valor de Custo</dt>
                <dd className="mt-1 text-sm text-slate-700">{formatCurrency(selectedProduct.costPrice)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Valor Final</dt>
                <dd className="mt-1 text-sm text-slate-700">{formatCurrency(selectedProduct.finalPrice)}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Marca</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.brand}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Fornecedor</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.supplier}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Quantidade em Estoque</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.stockQuantity}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-slate-500">Local de Estoque</dt>
                <dd className="mt-1 text-sm text-slate-700">{selectedProduct.stockLocation}</dd>
              </div>
            </dl>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 bg-slate-500/75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-slate-700 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-sm text-slate-500">
              Tem certeza que deseja excluir o produto "{productToDelete.name}"? Esta ação não pode ser desfeita.
            </p>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-md hover:bg-slate-200 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}