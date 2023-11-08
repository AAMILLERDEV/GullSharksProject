﻿namespace GullSharksLib.Models;

public class BillingAddress
{
    public int ID { get; set; }
    public int User_ID { get; set; }
    public string City { get; set; }
    public int Country_ID { get; set; }
    public int? Province_ID { get; set; }
    public string? PostalCode { get; set; }
    public string StreetAddress { get; set; }
    public bool MatchShipping { set; get; }
    public bool IsDeleted { get; set; }
}

