namespace GullSharksLib.Models;

public class CartItems
{
    public int ID { get; set; }
    public int GameID { get; set; }
    public int Quantity { get; set; }
    public float Subtotal { get; set; }
    public float Total { get; set; }
    public int UserID { get; set; }
    public Boolean IsDeleted { get; set; }
}
