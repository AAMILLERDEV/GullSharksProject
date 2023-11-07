namespace GullSharksLib.Models;

public class CartItems
{
    public int ID { get; set; }
    public int Game_ID { get; set; }
    public int Quantity { get; set; }
    public double Subtotal { get; set; }
    public double Total { get; set; }
    public int User_ID { get; set; }
    public bool IsDeleted { get; set; }
}
