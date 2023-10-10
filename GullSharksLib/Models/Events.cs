namespace GullSharksLib;

public class Events
{
    public int ID { set; get; }
    public string EventName { set; get; }
    public string Description { set; get; }
    public DateTime StartDate { set; get; }
    public DateTime EndDate { set; get; }

    public bool IsDeleted { set; get; }
}
