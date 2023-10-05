using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IAssetRepository
    {
        public Task<IEnumerable<Asset>> GetAssets();
    }
}
