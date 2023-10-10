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
    public Task<Events> GetEventByID(int id) => db.GetEventByID(id);
    public Task<int?> UpsertEvent(Events e) => db.UpsertEvent(e);
    
}
