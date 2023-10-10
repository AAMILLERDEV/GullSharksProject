using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace PlatformController;

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

