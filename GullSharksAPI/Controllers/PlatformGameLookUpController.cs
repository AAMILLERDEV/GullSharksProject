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

    [HttpGet]
    [Route("[controller]/GetPlatformGameLookUp/{platform_ID}")]
    public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp(int platform_ID) => db.GetPlatformsGamesLookUp(platform_ID);

    [HttpPost]
    [Route("[controller]/UpsertPlatformGameLookup")]
    public Task<int?> UpsertPlatformGameLookup(PlatformGameLookUp plat) => db.UpsertPlatformGameLookUp(plat);
}

