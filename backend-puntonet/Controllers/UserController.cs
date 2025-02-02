using backend_puntonet.DTOs;
using backend_puntonet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend_puntonet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly TodoAppContext _context;
        private readonly TokenService _tokenService;
        public UserController(TodoAppContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost]
        public async Task<ActionResult> CreateUser(UserRegister userRegister)
        {

            if (userRegister == null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El objeto usuario no puede ser nulo.",
                });
            }

            if (string.IsNullOrWhiteSpace(userRegister.Email))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El email no puede estar vacío.",
                });
            }

            if (string.IsNullOrWhiteSpace(userRegister.Username))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El nombre de usuario no puede estar vacío.",
                });
            }

            if (string.IsNullOrWhiteSpace(userRegister.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "La contraseña no puede estar vacía.",
                });
            }

            try
            {
                var emailAddress = new System.Net.Mail.MailAddress(userRegister.Email);
            }
            catch
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El formato del email no es válido.",
                });
            }

            // Verificar si el email o el username ya existen en la base de datos
            if (await _context.Users.AnyAsync(u => u.Email == userRegister.Email))
            {
                return Conflict(new
                {
                    success = false,
                    message = "El email ya está registrado.",
                });
            }

            if (await _context.Users.AnyAsync(u => u.Username == userRegister.Username))
            {
                return Conflict(new
                {
                    success = false,
                    message = "El nombre de usuario ya está en uso.",
                });
            }


            string hashedPassword = BCrypt.Net.BCrypt.HashPassword(userRegister.Password);

            var newUser = new User
            {
                Username = userRegister.Username.Trim(),
                Email = userRegister.Email.Trim(),
                Password = hashedPassword,
            };

            _context.Users.Add(newUser);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new
                {
                    success = true,
                    message = "Usuario creado correctamente.",
                    data = new UserDTO { UserID = newUser.UserID, Username = newUser.Username, Email = newUser.Email, ToDos = Array.Empty<ToDoDTO>(), },
                });
            }
            catch (DbUpdateException ex)
            {

                return StatusCode(500, new
                {
                    success = false,
                    message = "Error al guardar el usuario en la base de datos.",
                    detail = ex.InnerException?.Message,
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error interno del servidor.",
                    detail = ex.Message,
                });
            }
        }
        [HttpPost("login")]
        public async Task<ActionResult> Login(UserRegister userRegister)
        {

            if (userRegister == null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "El objeto usuario no puede ser nulo.",
                });
            }

            if (string.IsNullOrWhiteSpace(userRegister.Email) && string.IsNullOrWhiteSpace(userRegister.Username))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Tiene que ingresar o el usuario o el email.",
                });
            }

            if (string.IsNullOrWhiteSpace(userRegister.Password))
            {
                return BadRequest(new
                {
                    success = false,
                    message = "La contraseña no puede estar vacía.",
                });
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userRegister.Email.Trim() || u.Username == userRegister.Username.Trim());

            if (user == null)
            {
                return NotFound(new
                {
                    success = false,
                    message = "El email o usuario no existe en la base de datos.",
                });
            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(userRegister.Password, user.Password);


            if (!isPasswordValid)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "La contraseña es incorrecta.",
                });
            }

            var token = _tokenService.GenerateToken( user.Username, user.Email,user.UserID);

            return Ok(new
            {
                success = true,
                message = "Inicio de sesión correcto.",
                data = token,
            });
        }
    }
}
