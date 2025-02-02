using backend_puntonet.DTOs;
using backend_puntonet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace backend_puntonet.Controllers
{
   
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly TodoAppContext _context;

        public ToDoController(TodoAppContext context)
        {
            _context = context;
        }
        private UserDTO UserToDTO(User user)
        {
            if (user == null)
            {
                return null;
            }

            return new UserDTO
            {
                UserID = user.UserID,
                Username = user.Username,
                Email = user.Email,
                ToDos = user.ToDos?.Select(x => ToDoToDTO(x)).ToArray() ?? Array.Empty<ToDoDTO>()
            };
        }

        private ToDoDTO ToDoToDTO(ToDo toDo)
        {
            if (toDo == null)
            {
                return null;
            }

            return new ToDoDTO
            {
                TodoID = toDo.TodoID,
                Title = toDo.Title,
                Completed = toDo.Completed
            };
        }
    

        [HttpGet("{UserID}")]
        public async Task<ActionResult<UserDTO>> GetUserWithAllToDos(int UserID)
        {


            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Token no válido o no proporcionado.",
                    notoken = true
                });
            }

            var user = await _context.Users
                .Include(u => u.ToDos)
                .FirstOrDefaultAsync(u => u.UserID == UserID);

            if (user == null)
            {
                return NotFound();
            }

            var userDTO = UserToDTO(user);

            return Ok(new
            {
                success = true,
                message = "Usuario correcto",
                data = userDTO,
            });
        }

        [HttpPost]
        public async  Task<ActionResult<ToDo>>  CreateToDoItem(ToDoDTO toDoDTO)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Token no válido o no proporcionado.",
                    notoken = true
                });
            }
            if (toDoDTO == null)      
                return BadRequest(new
                {
                    success = false,
                    message = "El todo no  puede ser nulo",
                    data = false,
                });

            if (toDoDTO.Title == null || toDoDTO.Title.Trim() =="")
                return BadRequest( new {
                    success = false,
                    message = "El titulo no  puede ser vacio",
                    data = false,
                });

            if (toDoDTO.UserID == 0 )
                return BadRequest(new
                {
                    success = false,
                    message = "El id de usuario no puede ser nulo",
                    data = false,
                });
                
            
            var toDo = new ToDo
            {
                Title = toDoDTO.Title,
                Completed = false,
                UserID = toDoDTO.UserID
            };
            
          _context.ToDos.Add(toDo);

            try
            {
                await _context.SaveChangesAsync();

                var newToDo = await _context.ToDos.FirstOrDefaultAsync(t => t.TodoID == toDo.TodoID);

                return Ok(new {
                    success= true,
                    message= "To-Do creado correctamente",
                    data= newToDo,
                });

            }
            catch (Exception ex)
            {

                return StatusCode(500, new { Message = "Error interno del servidor al crear el elemento ToDo.", Detail = ex.Message });
            }

        }
             
        [HttpPut]
        public async Task<ActionResult<ToDoDTO>> UpdateToDoItem( ToDoDTO toDo)
        {
            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Token no válido o no proporcionado.",
                    notoken = true
                });
            }

            if (toDo == null)
                return BadRequest();
            

            var toDoUpdate = await _context.ToDos.FindAsync(toDo.TodoID);

            if (toDoUpdate == null)
            {
                return NotFound();
            }

            toDoUpdate.Title = toDo.Title;
            toDoUpdate.Completed = toDo.Completed;

            try
            {
                await _context.SaveChangesAsync();

                return Ok(
                     new
                     {
                         success = true,
                         message = "ToDo actualizado",
                         data = toDoUpdate,
                     });
            }
            catch (DbUpdateConcurrencyException) when (!_context.ToDos.Any(e => e.TodoID == toDo.TodoID))
            {
                return NotFound();
            }

            
        }
     
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteToDoItem(int id)
        {

            if (!User.Identity.IsAuthenticated)
            {
                return Unauthorized(new
                {
                    success = false,
                    message = "Token no válido o no proporcionado.",
                    notoken = true
                });
            }

            var toDo = await _context.ToDos.FindAsync(id);
            if (toDo == null)
            {
                return NotFound( );
            }

            _context.ToDos.Remove(toDo);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                success = true,
                message = "ToDo eliminado correactamente",
                data = false,
            });
        }
    }
}
