using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace GameReviewController;

[ApiController]
public class GameReviewController : ControllerBase
{
    public readonly IGameReviewRepository db;
    public GameReviewController(IGameReviewRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetGameReviews")]
    public Task<IEnumerable<GameReview>> GetGameReviews() => db.GetGameReviews();

    [HttpPost]
    [Route("[controller]/UpsertGameReview")]
    public Task<int?> UpsertGameReview(GameReview gameReview) => db.UpsertGameReview(gameReview);
    
}
