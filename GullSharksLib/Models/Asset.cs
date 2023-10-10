namespace GullSharksLib.Models;

public class Asset // lookup table
{
    public int ID { get; set; }
    public string Asset_URL { get; set; }
    public string Asset_Name { set; get; }

    public bool IsDeleted { get; set; }
}

