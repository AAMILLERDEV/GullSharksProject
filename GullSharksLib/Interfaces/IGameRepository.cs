using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IGameRepository
    {
        public Task<IEnumerable<Game>> GetGames();
    }
}
