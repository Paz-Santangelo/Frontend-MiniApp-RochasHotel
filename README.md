# Rochas Hotel – Frontend Mini App 🏨

Este repositorio contiene el frontend de una aplicación web para gestionar reservas y mostrar información de un hotel ficticio: **Rochas Hotel**. La app fue desarrollada en **JavaScript con React** utilizando **Vite** como entorno moderno de desarrollo.

El proyecto respeta buenas prácticas de arquitectura y diseño, como separación de responsabilidades entre componentes, vistas y lógica de estado, y el uso de `useReducer` para un control más claro y escalable del estado.

## ✨ Características principales

- Interfaz responsiva para reservas, listados de habitaciones y horarios disponibles.
- Navegación entre vistas mediante **React Router**.
- **Gestión del estado mediante `useReducer`**, ideal para manejar lógicas complejas de forma mantenible.
- Validación de formularios para crear nuevas reservas.
- Conexión con backend para persistencia (usando `fetch` o `axios`).
- **Separación de responsabilidades** en la estructura del código: componentes, vistas, lógica y estilos.
- Configuración con ESLint para mantener calidad de código.

## 🛠 Tecnologías utilizadas

| Tecnología          | Uso                                 |
|---------------------|-------------------------------------|
| JavaScript (ES6+)   | Lenguaje principal                  |
| React               | Biblioteca para construir la UI     |
| Vite                | Bundler rápido con soporte HMR      |
| React Router DOM    | Navegación SPA                      |
| `useReducer`        | Manejo estructurado del estado      |
| Fetch / Axios       | Llamadas HTTP                       |
| ESLint              | Linter para control de estilo       |

## 🔧 Requisitos previos

Antes de ejecutar el proyecto, asegurate de tener instalado:

- Node.js (versión 14 o superior)
- npm o yarn

## 🚀 Instalación y ejecución

1. Cloná este repositorio:

   ```bash
   git clone https://github.com/Paz-Santangelo/Frontend-MiniApp-RochasHotel.git
   cd Frontend-MiniApp-RochasHotel
   
2. Instalá las dependencias (podés usar **npm** o **yarn**):

   ```bash
   npm install
   ```

   o

   ```bash
   yarn install
   ```

3. Ejecutá la app en modo desarrollo:

   ```bash
   npm run dev
   ```

4. Accedé a la app en tu navegador:
   
   ```bash
   http://localhost:5173
   ```

## 📄 Uso

- **Inicio**: Información general del hotel.
- **Habitaciones**: Visualización de habitaciones con disponibilidad.
- **Reservas**: Formulario para crear nuevas reservas.
- **Contacto**: Información y medios de comunicación.

## 🧭 Enfoque de arquitectura y buenas prácticas

- Se utiliza **`useReducer`** para centralizar y estructurar la lógica del estado, ideal en componentes con múltiples tipos de acciones.
- La aplicación está dividida en **componentes reutilizables**, **vistas por ruta**, y **archivos separados por funcionalidad**.
- Se respeta el principio de **responsabilidad única**: los componentes renderizan, los hooks manejan lógica y las vistas orquestan la experiencia.
- Configuración de ESLint incluida para mantener la calidad del código.

## 🧪 Linter y calidad de código

Para analizar y corregir errores de estilo:

```bash
npm run lint
npm run lint:fix
```

## 🏗 Build para producción

Para generar los archivos estáticos de producción:

```bash
npm run build
```

Se crearán en la carpeta `dist/`, listos para ser desplegados en un servidor.

## 📂 Estructura del proyecto (orientativa)

```
/
├─ public/
├─ src/
│   ├─ assets/
│   ├─ components/
│   ├─ pages/
│   ├─ hooks/              # (si se usó para separar lógica con useReducer)
│   ├─ App.jsx
│   └─ main.jsx
├─ .eslintrc.js
├─ vite.config.js
└─ package.json
```

## 📝 Licencia

Este proyecto fue desarrollado por [**Paz Santangelo**](https://github.com/Paz-Santangelo). 

Todos los derechos reservados.
