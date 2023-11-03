namespace GullSharksLib;

public class Wishlist
{
    public int ID { set; get; }
    public int Game_ID { set; get; }
    public int User_ID { set; get; }
    public bool IsDeleted { get; set; }
    public DateTime DateAdded { set; get; }
    public int Quantity { set; get; }
}
