using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EventController;

[ApiController]
public class EventController : ControllerBase
{
    public readonly IEventRepository db;
    public EventController(IEventRepository ch)
    {
        this.db = ch;
    }

    
    [HttpGet]
    [Route("[controller]/GetEvents")]
    public Task<IEnumerable<Events>> GetEvents() => db.GetEvents();

    [HttpPost]
    [Route("[controller]/UpsertEvent")]
    public Task<int?> UpsertEvent(Events events) => db.UpsertEvent(events);

    [HttpGet]
    [Route("[controller]/GetEventRegistry/{user_ID}")]
    public Task<IEnumerable<EventRegistry>> GetEventRegistry(int user_ID) => db.GetEventRegistry(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertEventRegistry")]
    public Task<int?> UpsertEventRegistry(EventRegistry events) => db.UpsertEventRegistry(events);
}
