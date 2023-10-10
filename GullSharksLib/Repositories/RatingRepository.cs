using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class RatingRepository : IRatingRepository
{
    private readonly DBRepository db;

    public RatingRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Rating>> GetRatings() => db.GetRatings();
    public Task<Rating> GetRatingByID(int id) => db.GetRatingByID(id);
    public Task<int?> UpsertRating(Rating rating) => db.UpsertRating(rating);
}

