using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PlatformController;

[ApiController]
public class PlatformController : ControllerBase
{
    public readonly IPlatformRepository db;
    public PlatformController(IPlatformRepository ch)
    {
        this.db = ch;
    }

    /*
    [HttpGet]
    [Route("[controller]/GetPlatforms")]
    public Task<IEnumerable<Platform>> GetPlatforms() => db.GetPlatforms();
    */
}

