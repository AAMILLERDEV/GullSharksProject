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
    [Route("[controller]/GetBillingAddress/{user_ID}")]
    public Task<BillingAddress> GetBillingAddress(int user_ID) => db.GetBillingAddressByID(user_ID);
    [HttpPost]
    [Route("[controller]/UpsertBillingAddress")]
    public Task<int?> UpsertBillingAddress(BillingAddress gd) => db.UpsertBillingAddress(gd);
}