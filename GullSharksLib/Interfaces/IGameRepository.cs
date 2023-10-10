using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IGameRepository
    {
        public Task<IEnumerable<Game>> GetGames();
        public Task<int?> UpsertGame(Game game);
        public Task<bool> DeleteGame(int id, int gameDetailsID);
    }
}
