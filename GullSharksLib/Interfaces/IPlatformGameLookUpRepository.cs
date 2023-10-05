using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IPlatformGameLookUpRepository
    {
        public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp();
    }
}
