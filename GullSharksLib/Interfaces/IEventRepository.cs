using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IEventRepository
    {
        public Task<IEnumerable<Events>> GetEvents();
        public Task<Events> GetEventByID(int id);
        public Task<int?> UpsertEvent(Events ins);
    }
}
