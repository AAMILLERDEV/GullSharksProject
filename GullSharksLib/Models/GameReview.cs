namespace GullSharksLib;

public class GameReview
{
    public int ID { set; get; }
    public int User_ID { set; get; }
    public int Game_ID { set; get; }
    public bool IsApproved { set; get; }
    public string Description { set; get; }
    public int Rating_ID { set; get; }
}