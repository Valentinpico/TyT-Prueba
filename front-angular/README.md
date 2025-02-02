# Documentación del Frontend

```bash
Nota: El token dura 1 minuto si pasa el tiempo y quiere realizar una accion dentro de la cuenta lo sacara para que inice sesion nuevamente
```

## Descripción del Proyecto

Este es el frontend de una aplicación de lista de tareas (To-Do) hecho con angular lastimosamente solo logre hacer la parte del login con este framework me dio muchos problemas al no tener expericia casi con el mismo.

---
## Video de la App

Url: [Video en youtube](https://youtu.be/DnMKGi1NZv4)

---

## Funcionalidades

- Autenticación de usuarios con JWT
- Interfaz con Tailwind CSS

---

## Requisitos Previos

1. [Node.js](https://nodejs.org/) (versión 18.x o superior)
2. [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

---

## Pasos de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Valentinpico/TyT-Prueba
   cd TyT-Prueba
   cd front-angular
   ```

2. Instala las dependencias:

   ```bash
   npm install o npm i
   ```
3. Arrancar el servidor:

   ```bash
   ng server -o
   ```

---

## Configuración de Variables de Entorno

Crea un archivo `enviroment.ts` en el directorio enviroment dentro de la raíz y añade la URL de la API:

```javascript
export const environment = {
  production: false,
  API_URL: 'https://localhost:7121/api',
};

```
## Configuración de servicio de angular

dentro de `/app/services` estara la configuracion del servicio de auntenticacion

```javascript
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  // Método para realizar login con las credenciales de usuario
  login(credentials: UserAuth): Observable<any> {
    return this.http.post(`${this.apiUrl}/User/login`, credentials);
  }

  // Método para obtener datos del usuario usando su ID
  getUser(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/ToDo/${id}`);
  }
}


```

Asegúrate de que el backend esté corriendo en el puerto correcto o ajusta la variable de entorno según corresponda.


---

## Instalación y Configuración de Tailwind CSS

1. Tailwind CSS y PostCSS ya están configurados en este proyecto.

   Archivo `tailwind.config.js`:

   ```javascript
    /** @type {import('tailwindcss').Config} */
    module.exports = {
    content: [
        "./src/**/*.{html,ts}", 
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    };
   ```

2. Estilos globales en `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```




## Estructura del Proyecto

```plaintext
src/app
├    ├── api/            # servicios que se cominican con el backend
├    ├── components/     # Componentes reutilizables
├    ├── store/          # para gestionar estados globaels (zustand)
├    ├── utils/          # Funciones auxiliares
├    ├── App.tsx         # Componente principal de la aplicación
├    ├── index.css       # Componente principal de la aplicación
├    └── main.tsx        # Punto de entrada de la aplicación
├    
├── enviroment/          # env   
├── types/               # types para los formularios

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

