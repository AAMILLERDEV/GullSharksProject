﻿namespace GullSharksLib;

public class Events
{
    public int ID { set; get; }
    public string Event_Name { set; get; }
    public string Description { set; get; }
    public DateTime Start_Date { set; get; }
    public DateTime End_Date { set; get; }

    public bool IsDeleted { set; get; }
}