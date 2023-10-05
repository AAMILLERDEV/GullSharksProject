using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface ISettingRepository
    {
        public Task<IEnumerable<Setting>> GetSettings();
    }
}
