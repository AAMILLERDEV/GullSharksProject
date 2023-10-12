using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace ProvinceController;

[ApiController]
public class ProvinceController : ControllerBase
{
    public readonly IProvinceRepository db;
    public ProvinceController(IProvinceRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetProvinces")]
    public Task<IEnumerable<Province>> GetProvinces() => db.GetProvinces();
    
}

