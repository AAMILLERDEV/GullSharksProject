using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameDetailsController;

[ApiController]
public class GameDetailsController : ControllerBase
{
    public readonly IGameDetailsRepository db;
    public GameDetailsController(IGameDetailsRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetGameDetails")]
    public Task<IEnumerable<GameDetails>> GetGameDetails() => db.GetGameDetails();
    [HttpPost]
    [Route("[controller]/UpsertGameDetail")]
    public Task<int?> UpsertGameDetails(GameDetails gd) => db.UpsertGameDetails(gd);
}
