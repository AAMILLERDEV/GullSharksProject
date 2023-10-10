namespace GullSharksLib.Models
{
    public class Credential
    {
        public int ID { get; set; }
        public string CredentialValue { get; set; }
        public int User_ID { get; set; }
        public bool IsDeleted { get; set; }
    }
}
