using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IGameReviewRepository
    {
        public Task<IEnumerable<GameReview>> GetGameReviews();
        public Task<int?> UpsertGameReview(GameReview ins);
    }
}
