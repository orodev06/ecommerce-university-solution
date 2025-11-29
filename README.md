# E-Commerce University Solution

Solución de ejercicio de React para desarrollo web - Aplicación de comercio electrónico.

## 🚀 Descripción

Esta es una aplicación de e-commerce completa desarrollada con React que incluye:

- **Catálogo de productos** con búsqueda y filtrado por categorías
- **Carrito de compras** con gestión de cantidades
- **Vista de detalle de productos**
- **Proceso de checkout** completo
- **Diseño responsivo** para dispositivos móviles

## 📦 Tecnologías Utilizadas

- React 19
- React Context API para gestión de estado
- CSS moderno con gradientes y animaciones
- Componentes funcionales con Hooks

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone https://github.com/orodev06/ecommerce-university-solution.git

# Navegar al directorio
cd ecommerce-university-solution

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Cart.js          # Componente del carrito de compras
│   ├── Cart.css
│   ├── Checkout.js      # Componente de checkout
│   ├── Checkout.css
│   ├── Navbar.js        # Barra de navegación
│   ├── Navbar.css
│   ├── ProductCard.js   # Tarjeta de producto
│   ├── ProductCard.css
│   ├── ProductDetail.js # Vista de detalle de producto
│   ├── ProductDetail.css
│   ├── ProductList.js   # Lista de productos
│   └── ProductList.css
├── context/
│   └── CartContext.js   # Context para gestión del carrito
├── data/
│   └── products.js      # Datos de productos
├── App.js
├── App.css
└── index.js
```

## 🎯 Funcionalidades

### Catálogo de Productos
- Visualización de productos en grid
- Búsqueda por nombre y descripción
- Filtrado por categorías
- Información de stock disponible

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático de subtotal
- Envío gratis para compras mayores a $500
- Persistencia durante la sesión

### Checkout
- Formulario de datos de envío
- Simulación de pago con tarjeta
- Confirmación de pedido

## 🖥️ Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm test` - Ejecuta las pruebas
- `npm run build` - Genera la versión de producción
- `npm run eject` - Eyecta la configuración de CRA

## 📱 Responsive Design

La aplicación está optimizada para:
- Escritorio (1200px+)
- Tablet (768px - 1199px)
- Móvil (hasta 767px)

## 👨‍💻 Autor

Desarrollado como solución de ejercicio para desarrollo web con React.

## 📄 Licencia

MIT License
