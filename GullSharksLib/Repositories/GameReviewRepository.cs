using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameReviewRepository : IGameReviewRepository
{
    private readonly IDBRepository db;

    public GameReviewRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<GameReview>> GetGameReviews() => db.GetGameReviews();
    public Task<GameReview> GetGameReviewByID(int id) => db.GetGameReviewByID(id);
    public Task<int?> UpsertGameReview(GameReview gameReview) => db.UpsertGameReview(gameReview);
}

