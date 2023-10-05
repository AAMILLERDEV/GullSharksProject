namespace GullSharksLib.Models;

public class Preference
{
    public int ID { get; set; }
    public int UserDetails_ID { get; set; }
    public int Platform_ID { get; set; }
    public int GameCategory_ID { get; set; }
    public int LanguagePreferences_ID { get; set; }
}

