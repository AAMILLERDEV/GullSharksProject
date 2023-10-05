using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private readonly DBRepository db;

        public AssetRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<Asset>> GetAssets() => db.GetAssets();
    }
}
