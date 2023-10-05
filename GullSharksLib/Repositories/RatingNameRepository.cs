using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class RatingNamesRepository
{
    private readonly DBRepository db;

    public RatingNamesRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<RatingName>> GetRatingNames() => db.GetRatingNames();
}
