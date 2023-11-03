namespace GullSharksLib;

public class OrderDetails
{
    public int ID { set; get; }
    public int Quantity { set; get; }
    public double subtotal { set; get; }
    public double total { set; get; }
    public bool UseShippingAddress { get; set; }
    public DateTime DateCreated { set; get; }
    public bool IsDeleted { get; set; }
}
