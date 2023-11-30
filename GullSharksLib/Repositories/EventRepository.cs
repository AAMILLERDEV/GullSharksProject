using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class EventRepository : IEventRepository
{
    private readonly IDBRepository db;

    public EventRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Events>> GetEvents() => db.GetEvents();
    public Task<int?> UpsertEvent(Events e) => db.UpsertEvent(e);
    public Task<IEnumerable<EventRegistry>> GetEventRegistry(int user_ID) => db.GetEventRegistry(user_ID);
    public Task<int?> UpsertEventRegistry(EventRegistry e) => db.UpsertEventRegistry(e);

}
