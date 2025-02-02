# Documentación del Backend

## Descripción del Proyecto

Este es el backend de una aplicación de lista de tareas (To-Do) desarrollada con .NET 8. Proporciona una API para la autenticación de usuarios y la gestión de tareas.

---

## Tecnologías Utilizadas

- **.NET 8** - Framework principal
- **Entity Framework Core 9.0.1** - ORM para manejar la base de datos
- **SQL Server 9.0.1** - Base de datos
- **Bcrypt.Net-Next 4.0.3** - Hashing de contraseñas
- **Microsoft.AspNetCore.Authentication.JwtBearer 8.0.12** - Manejo de autenticación con JWT

---

## Requisitos Previos

1. [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
2. [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
3. [Postman](https://www.postman.com/) (opcional para probar la API)

---

## Pasos de Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/Valentinpico/TyT-Prueba
   cd TyT-Prueba
   cd backend-puntonet
   ```

2. Restaura las dependencias:

   ```bash
   dotnet restore
   ```

3. Configura la base de datos en `appsettings.json`:

   ```json
   {
     "ConnectionStrings": {
       "TodoAppContext": "Server=localhost\\SQLEXPRESS;Database=TodoApp;Trusted_Connection=True; Trust Server Certificate=True;"
     },
     "Jwt": {
       "SecretKey": "PicoPonceValentinTyTPrueba1316664166MantaEcuador2025",
       "Issuer": "ToDoApp",
       "Audience": "all",
       "ExpiryInMinutes": 1
     }
   }
   ```

4. Ejecuta la migración para crear las tablas en la base de datos:

   ```bash
   dotnet ef database update
   ```

5. Inicia el servidor:

   ```bash
   dotnet run
   ```

---

## Endpoints Principales

### Autenticación

- **POST** `/api/User/login` → Iniciar sesión
- **POST** `/api/User/` → Crear un nuevo usuario

### Gestión de Tareas

- **GET** `/api/ToDo` → Obtener todas las tareas
- **POST** `/api/ToDo` → Crear una nueva tarea
- **PUT** `/api/ToDo/{id}` → Actualizar una tarea
- **DELETE** `/api/ToDo/{id}` → Eliminar una tarea

---

## Configuración de JWT

Se utiliza **JwtBearer** para la autenticación. Agrega esta configuración en `Program.cs`:

```csharp
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// Configuraci�n de JWT
var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:SecretKey"]);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"], 
        ValidAudience = builder.Configuration["Jwt:Audience"], 
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ClockSkew = TimeSpan.Zero // Evita permitir un margen de tiempo extra
    };
});

builder.Services.AddScoped<TokenService>();

// Add services to the container.
builder.Services.AddDbContext<TodoAppContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("TodoAppContext"));
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()  
              .AllowAnyMethod()  
              .AllowAnyHeader(); 

    });
});



var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();
app.Run();
```

---

## Hashing de Contraseñas con Bcrypt

Se usa `Bcrypt.Net-Next` para el hash de contraseñas:

```csharp
using BCrypt.Net;

public class UserService
{
    public string HashPassword(string password)
    {
        return BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password, string hashedPassword)
    {
        return BCrypt.Verify(password, hashedPassword);
    }
}
```

---

## Estructura del Proyecto

```plaintext
backend-dotnet/
├── Controllers/        # Controladores de la API
├── Models/            # Modelos de la base de datos
├── Data/              # Contexto de la base de datos
├── Services/          # Servicios para lógica de negocio
├── Program.cs         # Archivo principal de configuración
├── appsettings.json   # Configuración de la aplicación
```

---

## Estilos de Código

El proyecto sigue los principios de **Clean Code** y **Arquitectura en Capas**, asegurando mantenibilidad y escalabilidad.

---

## Licencia

Este proyecto es de código abierto y se encuentra bajo la licencia MIT.
