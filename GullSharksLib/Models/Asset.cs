namespace GullSharksLib.Models;

public class Asset // lookup table
{
    public int ID { get; set; }
    public string AssetURL { get; set; }
    public string AssetName { set; get; }
    public bool IsDeleted { get; set; }
}

