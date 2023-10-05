using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IPlatformRepository
    {
        public Task<IEnumerable<Platform>> GetPlatforms();
    }
}
