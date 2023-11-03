using GullSharksLib;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace CartItemsController;

[ApiController]
public class CartItemsController : ControllerBase {

    public readonly IUserRepository db;
    public CartItemsController(IUserRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetCartItems")]
    public Task<IEnumerable<CartItems>> GetCartItems() => db.GetCartItems();

    [HttpGet]
    [Route("[controller]/GetCartItemsByID/{id}")]
    public Task<CartItems> GetCartItemsByID(int id) => db.GetCartItemsByID(id);

    [HttpPost]
    [Route("[controller]/UpsertCartItems")]
    public Task<int?> UpsertCartItems(CartItems cartItems) => db.UpsertCartItems(cartItems);

}


