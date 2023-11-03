namespace GullSharksLib;

public class FriendsList
{
    public int ID { set; get; }
    public int User_ID { set; get; }
    public int Friend_ID { set; get; }
    public bool IsConfirmed { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime DateAdded { set; get; }
}
