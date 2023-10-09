using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameController;

[ApiController]
public class GameController : ControllerBase
{
    public readonly IGameRepository db;
    public GameController(IGameRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetGames")]
    public Task<IEnumerable<Game>> GetGames() => db.GetGames();

    [HttpGet]
    [Route("[controller]/UpsertGame")]
    public Task<int?> UpsertGames(Game game) => db.UpsertGame(game);

}
