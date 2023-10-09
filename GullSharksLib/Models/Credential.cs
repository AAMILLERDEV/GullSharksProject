namespace GullSharksLib.Models
{
    public class Credential
    {
        public int ID { get; set; }
        public string Credential_Value { get; set; }
        public int User_ID { get; set; }

        public bool IsDeleted { get; set; }
    }
}
