using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IRatingNameRepository
    {
        public Task<IEnumerable<RatingName>> GetRatingNames();
    }
}
