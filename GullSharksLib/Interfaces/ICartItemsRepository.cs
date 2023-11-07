using GullSharksLib.Models;

namespace GullSharksLib;

public interface ICartItemsRepository
{
    public Task<IEnumerable<CartItems>> GetCartItemsByUserID(int user_ID);
    public Task<int?> UpsertCartItems(CartItems ins);
}
