﻿using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class RatingsRepository
{
    private readonly DBRepository db;

    public RatingsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Rating>> GetRatings() => db.GetRatings();
    // public Task<Rating> GetRatingByID(int id) => db.GetRatingByID(id);
    // public Task<int?> UpsertRating(Rating ins) => db.UpsertRating(rating);
}
