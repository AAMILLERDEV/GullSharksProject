using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace UserDetailsController;

[ApiController]
public class UserGameController : ControllerBase {

    public readonly IUserGamesRepository db;
    public UserGameController(IUserGamesRepository ch){
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetUserGames/{user_ID}")]
    public Task<IEnumerable<UserGame>> GetUserGames(int user_ID) => db.GetUserGames(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertUserGame")]
    public Task<int?> UpsertUserGame(UserGame ins) => db.UpsertUserGame(ins);

}


