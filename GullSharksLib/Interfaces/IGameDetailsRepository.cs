using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IGameDetailsRepository
    {
        public Task<IEnumerable<GameDetails>> GetGameDetails();
        public Task<int?> UpsertGameDetails(GameDetails gd);
    }
}
