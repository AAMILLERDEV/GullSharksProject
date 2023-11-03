namespace GullSharksLib.Models;

public class PaymentDetails
{
    public int ID { get; set; }
    public int Order_ID { get; set; }
    public int CardType_ID { get; set; }
    public int CardNumber { get; set; }
    public int SecurityCode { get; set; }
    public int User_ID { get; set; }
    public double Total { get; set; }
    public bool IsDeleted { get; set; }
}
