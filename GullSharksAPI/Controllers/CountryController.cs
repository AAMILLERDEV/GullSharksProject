using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace PlatformController;

[ApiController]
public class CountryController : ControllerBase
{
    public readonly ICountryRepository db;
    public CountryController(ICountryRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetCountries")]
    public Task<IEnumerable<Country>> GetCountries() => db.GetCountries();
    
}

