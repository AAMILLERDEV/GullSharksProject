namespace GullSharksLib;

public class User
{
    public int ID { set; get; }
    public string Username { set;get; }
    public string Email { set;get; }
    public int Credentials_ID { set;get; }
    public bool IsAdmin { set; get; }
    public int LoginCounter { set; get; }
    public bool IsValidated { set; get; }

    public bool IsDeleted { get; set; }
}
