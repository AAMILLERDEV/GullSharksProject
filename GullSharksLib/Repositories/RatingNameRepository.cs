using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class RatingNameRepository //: IRatingNameRepository
{
    private readonly DBRepository db;

    public RatingNameRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<RatingName>> GetRatingNames() => db.GetRatingNames();
}
