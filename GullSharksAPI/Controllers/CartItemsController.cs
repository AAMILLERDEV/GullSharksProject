using GullSharksLib;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace CartItemsController;

[ApiController]
public class CartItemsController : ControllerBase
{

    public readonly ICartItemsRepository db;
    public CartItemsController(ICartItemsRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetCartItemsByUserID/{user_ID}")]
    public Task<IEnumerable<CartItems>> GetCartItemsByID(int user_ID) => db.GetCartItemsByUserID(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertCartItem")]
    public Task<int?> UpsertCartItems(CartItems cartItems) => db.UpsertCartItems(cartItems);

}


