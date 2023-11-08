using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace ShippingAddressController;

[ApiController]
public class ShippingAddressController : ControllerBase
{
    public readonly IShippingAddressRepository db;
    public ShippingAddressController(IShippingAddressRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetShippingAddress/{user_ID}")]
    public Task<ShippingAddress> GetBillingAddress(int user_ID) => db.GetShippingAddressByID(user_ID);
    [HttpPost]
    [Route("[controller]/UpsertShippingAddress")]
    public Task<int?> UpsertBillingAddress(ShippingAddress gd) => db.UpsertShippingAddress(gd);
}
