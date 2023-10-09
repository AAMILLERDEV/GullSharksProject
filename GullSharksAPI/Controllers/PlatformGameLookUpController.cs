using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PlatformGameLookUpController;

[ApiController]
public class PlatformGameLookUpController : ControllerBase
{
    public readonly IPlatformGameLookUpRepository db;
    public PlatformGameLookUpController(IPlatformGameLookUpRepository ch)
    {
        this.db = ch;
    }

    /*
    [HttpGet]
    [Route("[controller]/GetPlatformGameLookUp")]
    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp() => db.GetPlatformsGamesLookUp();
    */
}

