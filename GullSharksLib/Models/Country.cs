namespace GullSharksLib.Models;

public class Country // lookup table
{
    public int ID { get; set; }
    public string CountryName { get; set; }
    public string CountryAB { get; set; }

    public bool IsDeleted { get; set; }
}

