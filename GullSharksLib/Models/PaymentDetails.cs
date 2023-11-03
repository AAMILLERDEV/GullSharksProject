namespace GullSharksLib.Models;

public class PaymentDetails
{
    public int ID { get; set; }
    public int OrderID { get; set; }
    public int CardTypeID { get; set; }
    public int CardNumber { get; set; }
    public int SecurityCode { get; set; }
    public int UserID { get; set; }
    public float Total { get; set; }
    public Boolean IsDeleted { get; set; }
}
