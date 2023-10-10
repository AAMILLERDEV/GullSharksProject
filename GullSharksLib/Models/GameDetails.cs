namespace GullSharksLib;

public class GameDetails
{
    public int ID { set; get; }
    public string Publisher { set; get; }
    public int Category_ID { set; get; }
    public string Description { set; get; }

    public bool IsDeleted { get; set; }
}

