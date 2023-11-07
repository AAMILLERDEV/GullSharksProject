using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class WishlistRepository : IWishlistRepository
{
    private readonly IDBRepository db;

    public WishlistRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Wishlist>> GetWishlistByUserID(int user_ID) => db.GetWishlistByUserID(user_ID);
    public Task<IEnumerable<Wishlist>> GetWishlist() => db.GetWishlists();
    public Task<int?> UpsertWishlist(Wishlist wishlist) => db.UpsertWishlist(wishlist);
}
