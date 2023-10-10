using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace RatingController;

[ApiController]
public class AssetController : ControllerBase
{
    public readonly IAssetRepository db;
    public AssetController(IAssetRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetAssets")]
    public Task<IEnumerable<Asset>> GetAssets() => db.GetAssets();
}

