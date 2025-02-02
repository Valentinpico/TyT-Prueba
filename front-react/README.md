# Documentación del Frontend

```bash
Nota: El token dura 5 minutos si pasa el tiempo y quiere realizar una accion dentro de la cuenta lo sacara para que inice sesion nuevamente
```

## Descripción del Proyecto

Este es el frontend de una aplicación de lista de tareas (To-Do) sencilla con autenticación de usuarios. La interfaz fue creada utilizando React, Vite y TypeScript, con estilos modernos gracias a Tailwind CSS.

se utilizaron otras librerias para mejorar la calidad de la app como Heroicons para calidad de interfaz y react-swipeable-list para hacer el deslizamiento de los todos, para hacer mas facil el desarrollo se utilizo Zustand para el manejo de estado globales, debido a su facilidad es muy bueno usarlo en proyectos

---

## Funcionalidades

- Autenticación de usuarios con JWT
- Gestor de tareas con soporte para crear, listar y eliminar
- Interfaz responsive y moderna gracias a Tailwind CSS
- Almacenamiento de tokens en `localStorage` para mantener sesiones activas

---

## Requisitos Previos

1. [Node.js](https://nodejs.org/) (versión 18.x o superior)
2. [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## Pasos de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Valentinpico/todo-list
   cd todo-list
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

---

## Configuración de Variables de Entorno

Crea un archivo `.env` en el directorio raíz y añade la URL de la API:

```env
VITE_API_URL=http://localhost:3000
```

Asegúrate de que el backend esté corriendo en el puerto correcto o ajusta la variable de entorno según corresponda.

---

## Scripts Disponibles

- **Iniciar el Servidor en Desarrollo**:

  ```bash
  npm run dev
  ```

- **Construir el Proyecto**:

  ```bash
  npm run build
  ```

- **Vista Previa del Build**:

  ```bash
  npm run preview
  ```

---

## Instalación y Configuración de Tailwind CSS

1. Tailwind CSS y PostCSS ya están configurados en este proyecto.

   Archivo `tailwind.config.js`:

   ```javascript
   export default {
     content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

2. Estilos globales en `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

.swipeable-list-item__leading-actions,
.swipeable-list-item__trailing-actions {
  @apply text-white text-lg uppercase font-bold;
}
.swipeable-list-item__leading-actions {
  @apply bg-blue-600;
}
.swipeable-list-item__trailing-actions {
  @apply bg-pink-600;
}
.swipeable-list .swipe-action {
  @apply flex justify-center items-center;
}
```

## los estilos de abajo son para la libreria de [react-swipeable-list](https://www.npmjs.com/package/react-swipeable-list)

## Uso de Heroicons

Heroicons ya está instalado y se usa para mostrar íconos en la interfaz. Ejemplo:

```tsx
import { CheckIcon } from "@heroicons/react/outline";

const Example = () => (
  <button>
    <CheckIcon className="h-6 w-6 text-green-500" />
    Completar
  </button>
);
```

---

## Estructura del Proyecto

```plaintext
src/
├── api/            # servicios que se cominican con el backend
├── components/     # Componentes reutilizables
├── store/          # para gestionar estados globaels (zustand)
├── types/          # types para los formularios
├── utils/          # Funciones auxiliares
├── App.tsx         # Componente principal de la aplicación
├── index.css         # Componente principal de la aplicación
└── main.tsx        # Punto de entrada de la aplicación
```

---

## Interacción con la API

Las solicitudes al backend se gestionan mediante la API Fetch o librerías como Axios (opcional). Ejemplo de solicitud para obtener las tareas de un usuario:

```typescript
export const loginUserApi = async (user: loginType) => {
  const loginData = {
    email: user.emailOrUsername,
    username: user.emailOrUsername,
    password: user.password,
  };

  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: responseApiType = await response.json();
    return data;
  } catch (error) {
    return { message: "Error en el servidor", success: false, data: null };
  }
};
```

---

## Estilos

Los estilos están totalmente gestionados por Tailwind CSS, asegurando una implementación rápida y responsiva.

Ejemplo:

```tsx
<div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Hola, mundo!
</div>
```

---

## Solución de Problemas

1. **Error: `vite: Failed to resolve import`**:

   - Asegúrate de que el archivo importado exista y que las extensiones sean correctas (.ts/.tsx).

2. **Problemas con el CSS**:

   - Verifica que los archivos CSS estén correctamente enlazados y que Tailwind esté configurado.

3. **Problemas con la URL de la API**:

   - Asegúrate de que la variable `VITE_API_URL` en `.env` apunte al backend correcto.

---

## Despliegue

1. Construye el proyecto:

   ```bash
   npm run build
   ```

2. Sube el contenido del directorio `dist/` a tu servidor o plataforma de hosting preferida (Netlify, Vercel, etc.).

---
