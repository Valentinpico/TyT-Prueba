   namespace backend_puntonet.DTOs
{
    public class ToDoDTO
    {

        public int TodoID { get; set; }
        public string Title { get; set; }
        public bool Completed { get; set; }
        public String CreatedAt  { get; set; } = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
        public int UserID { get; set; } 

    }
}
