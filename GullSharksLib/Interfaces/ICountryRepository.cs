using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface ICountryRepository
    {
        public Task<IEnumerable<Country>> GetCountries();
    }
}
