using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IUserGamesRepository
    {
        public Task<IEnumerable<UserGame>> GetUserGames(int user_ID);
        public Task<int?> UpsertUserGame(UserGame ins);
    }
}
