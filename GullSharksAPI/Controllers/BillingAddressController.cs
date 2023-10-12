using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace BillingAddressController;

[ApiController]
public class BillingAddressController : ControllerBase
{
    public readonly IBillingAddressRepository db;
    public BillingAddressController(IBillingAddressRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetBillingAddress/{userDetails_ID}")]
    public Task<BillingAddress> GetBillingAddress(int userDetails_ID) => db.GetBillingAddressByID(userDetails_ID);
    [HttpPost]
    [Route("[controller]/UpsertBillingAddress")]
    public Task<int?> UpsertBillingAddress(BillingAddress gd) => db.UpsertBillingAddress(gd);
}