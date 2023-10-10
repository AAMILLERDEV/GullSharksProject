using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IPreferenceRepository
    {
        public Task<IEnumerable<PlatformPreference>> GetPlatformPreferences(int user_ID);
        public Task<IEnumerable<LanguagePreference>> GetLanguagePreferences(int user_ID);
        public Task<IEnumerable<CategoryPreference>> GetCategoryPreferences(int user_ID);
        public Task<int?> UpsertLanguagePreference(LanguagePreference lang);
        public Task<int?> UpsertCategoryPreference(CategoryPreference lang);
        public Task<int?> UpsertPlatformPreference(PlatformPreference lang);
    }
}
