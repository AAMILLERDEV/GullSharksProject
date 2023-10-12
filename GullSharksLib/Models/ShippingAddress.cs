namespace GullSharksLib.Models;

public class ShippingAddress
{
    public int ID { get; set; }
    public int UserDetails_ID { get; set; }
    public string City { get; set; }
    public int Country_ID { get; set; }
    public int? Province_ID { get; set; }
    public string? PostalCode { get; set; }
    public string StreetAddress { get; set; }
    public string? DeliveryInstructions { get; set; }

    public bool IsDeleted { get; set; }
}

