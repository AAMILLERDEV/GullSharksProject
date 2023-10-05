using Microsoft.Extensions.Options;
namespace GullSharksLib;
public class EventsRepository
{
    private readonly DBRepository db;

    public EventsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Event>> GetEvents() => db.GetEvents();
    // public Task<Event> GetEventByID(int id) => db.GetEventByID(id);
    // public Task<int?> UpsertEvent(Event ins) => db.UpsertEvent(event);
}
