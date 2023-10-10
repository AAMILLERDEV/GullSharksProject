using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IPlatformGameLookUpRepository
    {
        public Task<IEnumerable<PlatformGameLookUp>> GetPlatformsGamesLookUp(int platform_ID);
        public Task<int?> UpsertPlatformGameLookUp(PlatformGameLookUp plat);
        public Task<IEnumerable<PlatformGameLookUp>> GetPlatformGameLookUpByGameDetailsID(int gameDetails_ID);
    }
}
