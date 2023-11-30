using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IEventRepository
    {
        public Task<IEnumerable<Events>> GetEvents();
        public Task<int?> UpsertEvent(Events ins);
        public Task<IEnumerable<EventRegistry>> GetEventRegistry(int user_ID);
        public Task<int?> UpsertEventRegistry(EventRegistry e);
    }
}
