using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IWishlistRepository
    {
        public Task<IEnumerable<Wishlist>> GetWishlistByUserID(int user_ID);
        public Task<IEnumerable<Wishlist>> GetWishlist();
        public Task<int?> UpsertWishlist(Wishlist wishlist);
    }
}
