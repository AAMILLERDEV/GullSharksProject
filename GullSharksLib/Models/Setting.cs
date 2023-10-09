namespace GullSharksLib.Models;

public class Setting // lookup table
{
    public int ID { get; set; }
    public string SettingKey { get; set; }
    public string SettingValue { get; set; }
    public bool IsReadOnly { get; set; }

    public bool IsDeleted { get; set; }
}

