export const categories = [
  { id: 'all', name: 'Todos', color: 'from-gray-600 to-gray-700' },
   { id: 'new', name: 'Lo nuevo', color: 'from-orange-600 to-orange-700' },
  { id: 'tradicional', name: 'Lo Tradicional', color: 'from-blue-600 to-blue-700' },
  { id: 'fit', name: 'Pa´ los Fit', color: 'from-purple-600 to-purple-700' },
  { id: 'junk', name: 'Pa´ los no tan Fit', color: 'from-emerald-600 to-emerald-700' },
  { id: 'sabor', name: 'Pa´ los saborear', color: 'from-orange-600 to-orange-700' },
];

export const products = [
  {
    id: 1,
    name: 'Tacos de Asada',
    description: 'Teléfono inteligente de última generación con cámara triple y batería de larga duración',
    price: 28,
    image: 'https://www.recetasnestle.com.mx/sites/default/files/srh_recipes/21454da67f37bc8947e7ea82469b496a.jpg',
    category: 'tradicional',
    stock: 15
  },
  {
    id: 2,
    name: 'Tacos de Chorizo',
    description: 'Audífonos premium con cancelación de ruido y sonido envolvente',
    price: 25,
    image: 'https://www.vvsupremo.com/foodservice/wp-content/uploads/2017/03/Chorizo-Tacodilla-FS2-716x483-sRGB.jpg',
    category: 'tradicional',
    stock: 25
  },
  {
    id: 3,
    name: 'Tacos de Suadero',
    description: 'Laptop de alto rendimiento para gaming y trabajo profesional',
    price: 29,
    image: 'https://media.istockphoto.com/id/1430849921/es/foto/orden-de-tacos-closeup.jpg?s=612x612&w=0&k=20&c=OUrSGX2P6UlyrD13G8QJ_mRQ_d5luWEm2JJRx8q1D4M=',
    category: 'tradicional',
    stock: 8
  },
  {
    id: 4,
    name: 'Tacos de Tripa',
    description: 'Camiseta de algodón 100% orgánico, cómoda y duradera',
    price: 29,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQc6RuW9XUMQe5tOFLz86xd6HZbAvtfghPQg&s',
    category: 'tradicional',
    stock: 50
  },
  {
    id: 5,
    name: 'Tacos de Lengua',
    description: 'Pantalones de mezclilla de corte clásico, perfectos para cualquier ocasión',
    price: 45,
    image: 'https://www.simplyrecipes.com/thmb/cV81A7hFM9vabAtu3ojPvL18T7I=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__01__beef-tacos-de-lengua-horiz-b-1600-b42bfdf9988448ef95841c033a08a18f.jpg',
    category: 'tradicional',
    stock: 30
  },
  {
    id: 6,
    name: 'Quesadilla Natural',
    description: 'Chaqueta ligera resistente al agua, ideal para actividades al aire libre',
    price: 20,
    image: 'https://tienda.lahuerta.com.mx/cdn/shop/files/ICEZR13191.png?v=1694808943',
    category: 'tradicional',
    stock: 20
  },
  {
    id: 7,
    name: 'Volcan Natural',
    description: 'Smartwatch con monitor de salud y GPS integrado',
    price: 20,
    image: 'https://mojo.generalmills.com/api/public/content/E1NEVX2590GGdqzL-BzzMg_gmi_hi_res_jpeg.jpeg?v=721a70a7&t=16e3ce250f244648bef28c5949fb99ff',
    category: 'tradicional',
    stock: 35
  },
  {
    id: 8,
    name: 'Quesadilla de Asada',
    description: 'Mochila elegante con compartimento para laptop y múltiples bolsillos',
    price: 45,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkAs5OAms6kzTEA-16cOxhOu6rF3ue7Mo1VA&s',
    category: 'tradicional',
    stock: 40
  },
  {
    id: 9,
    name: 'Quesadilla de Chorizo',
    description: 'Lentes con protección UV 100% y diseño moderno',
    price: 45,
    image: 'https://www.vvsupremo.com/foodservice/wp-content/uploads/2013/12/Chorizo-Quesadillas-FS2-716x483-sRGB.jpg',
    category: 'tradicional',
    stock: 60
  },
  {
    id: 10,
    name: 'Refresco',
    description: 'Lámpara de escritorio con regulador de intensidad y carga inalámbrica',
    price: 35,
    image: 'https://tradepoint.com.mx/4675-large_default/refresco-mix-de-pepsi-24-botellas-de-400-ml-1-24-152549.jpg',
    category: 'tradicional',
    stock: 45
  },
  {
    id: 11,
    name: 'TAgua de sabor',
    description: 'Set de cojines decorativos de terciopelo con diseños exclusivos',
    price: 29,
    image: 'https://www.codigosanluis.com/wp-content/uploads/AGUAS.jpg',
    category: 'tradicional',
    stock: 75
  },
  {
    id: 12,
    name: 'Agua Natural',
    description: 'Difusor ultrasónico con luces LED y temporizador automático',
    price: 18,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTSZN1fJu-MC8uVIDJZWuOkFEnNObuldQn9Q&s',
    category: 'tradicional',
    stock: 28
  },
];