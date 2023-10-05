using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IProvinceRepository
    {
        public Task<IEnumerable<Province>> GetProvinces();
    }
}
