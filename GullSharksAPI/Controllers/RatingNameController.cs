using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace RatingNameController;

[ApiController]
public class RatingNameController : ControllerBase
{
    public readonly IRatingNameRepository db;
    public RatingNameController(IRatingNameRepository ch)
    {
        this.db = ch;
    }

    /*
    [HttpGet]
    [Route("[controller]/GetRatingName")]
    public Task<IEnumerable<RatingName>> GetRatingNames() => db.GetRatingNames();
    */
}