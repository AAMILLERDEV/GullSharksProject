using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class EventRepository //: IEventRepository
{
    private readonly DBRepository db;

    public EventRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    // public Task<IEnumerable<Event>> GetEvents() => db.GetEvents();
    // public Task<Event> GetEventByID(int id) => db.GetEventByID(id);
    // public Task<int?> UpsertEvent(Event event) => db.UpsertEvent(event);
}
