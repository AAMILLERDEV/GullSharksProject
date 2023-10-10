using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class CountryRepository : ICountryRepository
    {
        private readonly IDBRepository db;

        public CountryRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<IEnumerable<Country>> GetCountries() => db.GetCountries();
    }
}
