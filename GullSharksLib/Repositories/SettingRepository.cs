using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class SettingRepository : ISettingRepository
    {
        private readonly DBRepository db;

        public SettingRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<Setting>> GetSettings() => db.GetSettings();
    }
}
