using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IGameCategoryRepository
    {
        public Task<IEnumerable<GameCategory>> GetGameCategories();
    }
}
