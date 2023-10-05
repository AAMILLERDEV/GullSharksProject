using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class ProvinceRepository //: IProvinceRepository
    {
        private readonly DBRepository db;

        public ProvinceRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<Province>> GetProvinces() => db.GetProvinces();
    }
}
