using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameCategoryController;

[ApiController]
public class GameCategoryController : ControllerBase
{
    public readonly IGameCategoryRepository db;
    public GameCategoryController(IGameCategoryRepository ch)
    {
        this.db = ch;
    }

    /*
    [HttpGet]
    [Route("[controller]/GetGameCategory")]
    public Task<IEnumerable<GameCategory>> GetGameCategory() => db.GetGameCategory();
    */
}
