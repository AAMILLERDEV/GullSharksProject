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

    /*
    [HttpGet]
    [Route("[controller]/GetEvents")]
    public Task<IEnumerable<Event>> GetEvents() => db.GetEvents();

    [HttpGet]
    [Route("[controller]/GetEventByID/{id}")]
    public Task<Event> GetEventByID(int id) => db.GetEventByID(id);

    [HttpPost]
    [Route("[controller]/UpsertEvent")]
    public Task<int?> UpsertEvent(Event events) => db.UpsertEvent(events);
    */

}
