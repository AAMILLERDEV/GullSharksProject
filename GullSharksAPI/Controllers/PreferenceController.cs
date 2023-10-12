using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PreferenceController;

[ApiController]
public class PreferenceController : ControllerBase {

    public readonly IPreferenceRepository db;
    public PreferenceController(IPreferenceRepository ch){
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetPlatformPreferences/{user_ID}")]
    public Task<IEnumerable<PlatformPreference>> GetPlatformPreferences(int user_ID) => db.GetPlatformPreferences(user_ID);

    [HttpGet]
    [Route("[controller]/GetLanguagePreference/{user_ID}")]
    public Task<IEnumerable<LanguagePreference>> GetLanguagePreference(int user_ID) => db.GetLanguagePreferences(user_ID);

    [HttpGet]
    [Route("[controller]/GetCategoryPreferences/{user_ID}")]
    public Task<IEnumerable<CategoryPreference>> GetCategoryPreferences(int user_ID) => db.GetCategoryPreferences(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertCategoryPreference")]
    public Task<int?> UpsertGameDetails(CategoryPreference cp) => db.UpsertCategoryPreference(cp);

    [HttpPost]
    [Route("[controller]/UpsertLanguagePreference")]
    public Task<int?> UpsertLanguagePreference(LanguagePreference gd) => db.UpsertLanguagePreference(gd);

    [HttpPost]
    [Route("[controller]/UpsertPlatformPreference")]
    public Task<int?> UpsertPlatformPreference(PlatformPreference gd) => db.UpsertPlatformPreference(gd);


}


