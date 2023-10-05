using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class GameReviewsRepository
{
    private readonly DBRepository db;

    public GameReviewsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<GameReview>> GetGameReviews() => db.GetGameReviews();
    // public Task<GameReview> GetGameReviewByID(int id) => db.GetGameReviewByID(id);
    // public Task<int?> UpsertGameReview(GameReview ins) => db.UpsertGameReview(gameReview);
}

