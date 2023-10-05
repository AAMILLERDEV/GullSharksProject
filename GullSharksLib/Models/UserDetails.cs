namespace GullSharksLib.Models
{
    public class UserDetails
    {
        public int ID { get; set; }
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        public string Gender { get; set; }
        public int User_ID { get; set; }
        public string Birth_Date { get; set; }
        public bool ReceivesEmailUpdates { get; set; }
        public string PhoneNumber { get; set; }
    }
}
