using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class PreferenceRepository : IPreferenceRepository
    {
        private readonly DBRepository db;

        public PreferenceRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<Preference>> GetPreferences() => db.GetPreferences();
        // public Task<Preference> GetPreferenceByID(int id) => db.GetPreferenceByID(id);
        // public Task<int?> UpsertPreference(Preference ins) => db.UpsertPreference(preference);
    }
}
