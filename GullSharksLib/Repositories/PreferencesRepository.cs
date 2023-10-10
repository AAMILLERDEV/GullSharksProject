using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class PreferencesRepository : IPreferenceRepository
{
    private readonly IDBRepository db;

    public PreferencesRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<PlatformPreference>> GetPlatformPreferences(int user_ID) => db.GetPlatformPreferences(user_ID);
    public Task<IEnumerable<LanguagePreference>> GetLanguagePreferences(int user_ID) => db.GetLanguagePreferences(user_ID);
    public Task<IEnumerable<CategoryPreference>> GetCategoryPreferences(int user_ID) => db.GetCategoryPreferences(user_ID);
    public Task<int?> UpsertPlatformPreference(PlatformPreference plat) => db.UpsertPlatformPreference(plat);
    public Task<int?> UpsertCategoryPreference(CategoryPreference cat) => db.UpsertCategoryPreference(cat);
    public Task<int?> UpsertLanguagePreference(LanguagePreference lang) => db.UpsertLanguagePreference(lang);
}
