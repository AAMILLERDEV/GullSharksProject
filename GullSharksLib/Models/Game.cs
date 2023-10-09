namespace GullSharksLib;

public class Game
{
    public int ID { set; get; }
    public string Game_Name { set; get; }
    public int Asset_ID { set; get; }
    public int GameDetails_ID { set; get; }
    public float PriceInCAD { set; get; }

    public bool IsDeleted { get; set; }
}
