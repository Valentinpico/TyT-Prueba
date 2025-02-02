namespace backend_puntonet.DTOs
{
    public class UserDTO
    {

        public int UserID { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public ToDoDTO[] ToDos { get; set; }


    }
}
