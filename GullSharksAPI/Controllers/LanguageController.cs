using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace LanguageController;

[ApiController]
public class LanguageController : ControllerBase
{
    public readonly ILanguageRepository db;
    public LanguageController(ILanguageRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetLanguages")]
    public Task<IEnumerable<Language>> GetLanguages() => db.GetLanguages();
    
}

