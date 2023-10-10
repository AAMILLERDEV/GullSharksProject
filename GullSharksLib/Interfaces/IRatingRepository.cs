using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IRatingRepository
    {
        public Task<IEnumerable<Rating>> GetRatings();
        public Task<int?> UpsertRating(Rating ins);
    }
}
