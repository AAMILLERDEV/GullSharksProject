using GullSharksLib.Models;

namespace GullSharksLib;

public interface ICartItemsRepository
{
    public Task<IEnumerable<CartItems>> GetCartItems();
    public Task<CartItems> GetCartItemsByID(int id);
    public Task<int?> UpsertCartItems(CartItems ins);
}
