using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PlatformRepository //: IPlatformRepository
{
    private readonly DBRepository db;

    public PlatformRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Platform>> GetPlatforms() => db.GetPlatforms();
}
