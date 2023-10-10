using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class AssetRepository : IAssetRepository
    {
        private readonly IDBRepository db;

        public AssetRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<IEnumerable<Asset>> GetAssets() => db.GetAssets();
    }
}
