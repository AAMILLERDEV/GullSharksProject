﻿namespace GullSharksLib;

public class CategoryPreference
{
    public int ID { set; get; }
    public int User_ID { set; get; }
    public int Category_ID { set; get; }
    public bool IsDeleted { get; set; }
}

