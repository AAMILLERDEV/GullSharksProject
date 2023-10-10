using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface ILanguageRepository
    {
        public Task<IEnumerable<Language>> GetLanguages();
    }
}
