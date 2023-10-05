using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IEventRepository
    {
        public Task<IEnumerable<Event>> GetEvents();
        public Task<Event> GetEventByID(int id);
        public Task<int?> UpsertEvent(Event ins);
    }
}
