using Microsoft.EntityFrameworkCore;

namespace backend_puntonet.Models
{
    public class TodoAppContext : DbContext
    {   

        public TodoAppContext(DbContextOptions<TodoAppContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<ToDo> ToDos { get; set; }
    }
}
