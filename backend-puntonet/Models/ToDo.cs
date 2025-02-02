using System.ComponentModel.DataAnnotations.Schema;

namespace backend_puntonet.Models
{
    public class ToDo
    {
        public int TodoID { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
        public int UserID { get; set; }
        public String CreatedAt { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");


        [ForeignKey("UserID")]
        public User User { get; set; }
    }
}
