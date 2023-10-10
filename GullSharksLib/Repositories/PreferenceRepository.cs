using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class PreferenceRepository : IPreferenceRepository
    {
        private readonly IDBRepository db;

        public PreferenceRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<IEnumerable<Preference>> GetPreferences() => db.GetPreferences();
        public Task<Preference> GetPreferenceByID(int userDetails_ID) => db.GetPreferencesByID(userDetails_ID);
        public Task<int?> UpsertPreference(Preference ins) => db.UpsertPreferences(ins);
    }
}
