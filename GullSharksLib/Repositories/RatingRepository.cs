using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class RatingRepository : IRatingRepository
{
    private readonly IDBRepository db;

    public RatingRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Rating>> GetRatings() => db.GetRatings();
    public Task<int?> UpsertRating(Rating rating) => db.UpsertRatings(rating);
}

