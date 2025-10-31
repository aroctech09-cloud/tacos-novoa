import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Se ha añadido ShoppingCart a la lista de importaciones para solucionar el error
import { X, Clock, CreditCard, DollarSign, Copy, CheckCircle, MessageCircle, MapPin, Truck, Home, ShoppingCart } from 'lucide-react';

// MODIFICACIÓN CRUCIAL: La lista de sucursales ahora incluye el número de WhatsApp
const SUCURSALES = [
  { name: 'Sucursal Centro (Calle Principal 123)', whatsapp: '8441000111' },
  //{ name: 'Sucursal Norte (Av. Tecnológico 456)', whatsapp: '8441000222' },
  //{ name: 'Sucursal Sur (Blvd. Fundadores 789)', whatsapp: '8441000333' },
];

// Componente simple de mensaje (reemplaza alert)
const MessageDisplay = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100] p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white rounded-2xl p-6 shadow-2xl w-full max-w-xs text-center"
      onClick={(e) => e.stopPropagation()}
    >
      <CheckCircle className={`w-10 h-10 mx-auto mb-3 ${type === 'error' ? 'text-red-500' : 'text-green-500'}`} />
      <p className="font-semibold text-gray-800">{message}</p>
      <button
        onClick={onClose}
        className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
      >
        Cerrar
      </button>
    </motion.div>
  </motion.div>
);

const OrderModal = ({ isOpen, onClose, cartItems = [], totalPrice = 0 }) => {
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [copied, setCopied] = useState(false);
  const [customerName, setCustomerName] = useState('');
  // NUEVOS ESTADOS para el tipo de servicio y la sucursal
  // Se inicializa con el nombre de la primera sucursal
  const [orderType, setOrderType] = useState('takeout'); // 'dine-in', 'takeout', 'delivery'
  const [selectedSucursalName, setSelectedSucursalName] = useState(SUCURSALES[0].name);
  const [message, setMessage] = useState(null); // Para mostrar mensajes (reemplaza alert)

  const bankAccount = '1234-5678-9012-3456';
  // Eliminamos whatsappNumber global ya que ahora está en SUCURSALES

  // Función para copiar al portapapeles
  const copyToClipboard = (text) => {
    // Usamos document.execCommand('copy') como fallback seguro
    if (document.execCommand) {
        const tempTextArea = document.createElement('textarea');
        tempTextArea.value = text;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(tempTextArea);
    } else {
        // Fallback para entornos donde no funciona execCommand
        console.error("No se pudo copiar el texto automáticamente.");
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Lógica principal para confirmar y enviar el pedido por WhatsApp
  const handleConfirmOrder = () => {
    if (!customerName.trim()) {
      setMessage({ text: 'Por favor ingresa tu nombre para continuar.', type: 'error' });
      return;
    }
    
    // Si es para llevar o a domicilio, verificar la sucursal
    if (orderType !== 'dine-in' && !selectedSucursalName) {
      setMessage({ text: 'Por favor selecciona una sucursal.', type: 'error' });
      return;
    }

    // OBTENER EL NÚMERO DE WHATSAPP BASADO EN LA SUCURSAL SELECCIONADA
    const selectedSucursal = SUCURSALES.find(s => s.name === selectedSucursalName);
    if (!selectedSucursal || !selectedSucursal.whatsapp) {
        setMessage({ text: 'Error: No se encontró el número de WhatsApp para la sucursal seleccionada.', type: 'error' });
        return;
    }
    const whatsappNumber = selectedSucursal.whatsapp;
    
    const orderDetails = cartItems.map(item =>
      `• ${item.name} - Cantidad: ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('%0A');

    const paymentInfo = paymentMethod === 'transfer'
      ? `Método de pago: Transferencia bancaria%0ACuenta: ${bankAccount}`
      : 'Método de pago: Efectivo';

    let orderLocation;
    if (orderType === 'dine-in') {
      orderLocation = 'Tipo de servicio: Comer Aquí';
    } else if (orderType === 'takeout') {
      orderLocation = `Tipo de servicio: Para Llevar%0ASucursal de Recolección: ${selectedSucursalName}`;
    } else { // delivery
      orderLocation = `Tipo de servicio: A Domicilio%0A*Nota: La dirección debe ser acordada con el restaurante.*%0ASucursal de Envío: ${selectedSucursalName}`;
    }
    
    const message = `¡Hola! Quiero confirmar mi pedido:%0A%0A` +
      `Nombre: ${customerName}%0A` +
      `${orderLocation}%0A%0A` +
      `${orderDetails}%0A%0ATotal: $${totalPrice.toFixed(2)}%0A%0A` +
      `${paymentInfo}%0A%0AHorario de recolección: 9am - 4pm`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    onClose();
  };

  return (
    <AnimatePresence>
      {message && <MessageDisplay message={message.text} type={message.type} onClose={() => setMessage(null)} />}
      {isOpen && (
        <motion.div
          // MODIFICADO: Usamos 'items-start' en lugar de 'items-center' y añadimos 'pt-16' para empujar el modal hacia abajo.
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >

            <div className="p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* CÍRCULO ROJO INTENSO */}
                  <div className="w-10 h-10 bg-gradient-to-r from-[#D32F2F] to-red-600 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Confirmar Pedido
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Revisa los detalles antes de continuar
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Horario (Ajuste de color) */}
              <motion.div
                className="bg-red-50 border border-red-200 rounded-2xl p-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D32F2F] mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">
                      Horario de Servicio
                    </h4>
                    <p className="text-red-700 text-sm">
                      Lunes a Jueves: <strong>7pm - 1:10 am</strong> <p></p> Sabado a Domingo: <strong>7:00pm - 3:10am</strong>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* TIPO DE SERVICIO: Comer Aquí / Para Llevar / A Domicilio */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-semibold text-gray-900 mb-3">Tipo de Servicio:</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'dine-in', label: 'Comer Aquí', icon: Home },
                    { value: 'takeout', label: 'Para Llevar', icon: ShoppingCart },
                    { value: 'delivery', label: 'A Domicilio', icon: Truck },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setOrderType(value)}
                      className={`flex flex-col items-center p-3 rounded-2xl transition-all duration-200 text-sm font-medium border-2 
                        ${orderType === value
                          ? 'bg-[#D32F2F] text-white border-[#D32F2F] shadow-md'
                          : 'bg-gray-100 text-gray-700 border-gray-100 hover:bg-gray-200'
                        }`}
                    >
                      <Icon className="w-5 h-5 mb-1" />
                      {label}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* SELECCIÓN DE SUCURSAL (Solo si no es Comer Aquí) */}
              {orderType !== 'dine-in' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {orderType === 'takeout' ? 'Sucursal de Recolección:' : 'Sucursal de Envío:'}
                  </h4>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={selectedSucursalName}
                      onChange={(e) => setSelectedSucursalName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-[#D32F2F] font-medium text-gray-700"
                    >
                      {/* Usamos el .name de cada sucursal para la opción */}
                      {SUCURSALES.map((sucursal) => (
                        <option key={sucursal.name} value={sucursal.name}>
                          {sucursal.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}


              {/* Campo de nombre */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block mb-2 font-semibold text-gray-900">Nombre para el pedido:</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D32F2F]"
                />
              </motion.div>

              {/* Método de pago (Ajuste de color) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="font-semibold text-gray-900 mb-3">Método de Pago:</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="transfer"
                      checked={paymentMethod === 'transfer'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#D32F2F]" // Color del radio button
                    />
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Transferencia Bancaria</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 accent-[#D32F2F]" // Color del radio button
                    />
                    <DollarSign className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">Efectivo al Recoger</span>
                  </label>
                </div>
              </motion.div>

              {/* Cuenta bancaria (Ajuste de color) */}
              {paymentMethod === 'transfer' && (
                <motion.div
                  className="bg-red-50 border border-red-200 rounded-2xl p-4"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <h5 className="font-semibold text-red-900 mb-2">Número de Cuenta:</h5>
                  <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-red-200">
                    <span className="flex-1 font-mono font-semibold text-red-800">
                      {bankAccount}
                    </span>
                    <motion.button
                      onClick={() => copyToClipboard(bankAccount)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${copied
                          ? 'bg-red-200 text-red-800'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copiar
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Total y botón de confirmación */}
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total a Pagar:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-[#D32F2F] to-red-600 bg-clip-text text-transparent">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  onClick={handleConfirmOrder}
                  // Botón principal ROJO
                  className="w-full py-4 bg-gradient-to-r from-[#D32F2F] to-red-600 text-white rounded-2xl font-semibold hover:from-red-600 hover:to-[#D32F2F] transition-all duration-300 shadow-lg shadow-[#D32F2F]/50 flex items-center justify-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle className="w-5 h-5" />
                  Confirmar Pedido por WhatsApp
                </motion.button>
                <button 
                  onClick={onClose} 
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Cancelar / Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;