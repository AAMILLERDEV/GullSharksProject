namespace GullSharksLib;

public class Order
{
    public int ID { set; get; }
    public int Game_ID { set; get; }
    public double Subtotal { set; get; }
    public double Total { set; get; }
    public bool IsConfirmed { get; set; }
    public DateTime DateCreated { set; get; }
    public int OrderDetail_ID { set; get; }
    public int User_ID { set; get; }
    public bool IsDeleted { get; set; }

}