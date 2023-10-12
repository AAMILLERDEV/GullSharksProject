namespace GullSharksLib.Models
{
    public class UserDetails
    {
        public int ID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public int User_ID { get; set; }
        public DateTime BirthDate { get; set; }
        public bool ReceivesUpdates { get; set; }
        public string? PhoneNumber { get; set; }
        public bool IsDeleted { get; set; }
    }
}
