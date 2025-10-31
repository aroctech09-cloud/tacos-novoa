// Header.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Menu, X } from 'lucide-react'; // <-- ¡IMPORTACIÓN CLAVE!
import CartButton from './CartButton';

const Header = ({ 
  cartItems = [], 
  onCartUpdate = () => {}, 
  searchTerm = '', 
  onSearchChange = () => {},
  selectedCategory = 'all',
  onCategoryChange = () => {},
  categories = []
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <motion.header 
      // Fondo: Negro Cálido
      className="bg-[#1A1A1A]/95 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            {/* Logo: Negro Cálido y Rojo Intenso */}
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center border border-[#D32F2F]">
              <span className="text-[#D32F2F] font-bold text-lg">🌮</span>
            </div>
            <div className="hidden sm:block">
              {/* Título: Degradado Blanco/Rojo */}
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-[#D32F2F] bg-clip-text text-transparent">
                Tacos Novoa
              </h1>
              <p className="text-sm text-gray-400 font-medium">Tu antojo al alcance de tu mano</p>
            </div>
          </motion.div>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              {/* Ícono de búsqueda: Blanco */}
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                // Campo de búsqueda: Fondo más oscuro, texto blanco
                className="w-full pl-12 pr-6 py-3 bg-gray-900 border border-gray-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:border-[#D32F2F] transition-all duration-300 text-white font-medium placeholder-gray-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CartButton 
              cartItems={cartItems}
              onCartUpdate={onCartUpdate}
            />
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              // Botón de menú (toggle): Color de fondo oscuro y blanco para el ícono
              className="lg:hidden w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors duration-200 text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <motion.div 
          className={`lg:block overflow-hidden transition-all duration-300 ${isMenuOpen ? 'block mt-4' : 'hidden'}`}
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0 }}
        >
          {/* Separador de categorías: Gris oscuro */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-700 lg:border-t-0 lg:pt-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => {
                  onCategoryChange(category.id);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  // Estilo de botón de categoría
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-red-700/50`
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};
export default Header;