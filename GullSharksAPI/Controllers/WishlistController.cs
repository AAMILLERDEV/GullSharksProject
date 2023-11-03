using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace WishlistController;

[ApiController]
public class WishlistController : ControllerBase
{

    public readonly IWishlistRepository db;
    public WishlistController(IWishlistRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetWishlistByUserID/{uid}")]
    /public Task<IEnumerable<Wishlist>> GetWishlistByUserID(int user_ID) => db.GetWishlistByUserID(user_ID);

    [HttpGet]
    [Route("[controller]/GetWishlistByID/{id}")]
    public Task<IEnumerable<Wishlist>> GetWishlistByID(int id) => db.GetWishlistByID(id);

    [HttpPost]
    [Route("[controller]/UpsertWishlist")]
    public Task<int?> UpsertWishlist(Wishlist wishlist) => db.UpsertWishlist(wishlist);

}
