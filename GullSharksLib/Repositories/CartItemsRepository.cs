//using GullSharksLib.Models;
//using Microsoft.Extensions.Options;

//namespace GullSharksLib;

//public class CartItemsRepository : ICartItemsRepository
//{
//    private readonly IDBRepository db;

//    public CartItemsRepository(IOptionsMonitor<AppSetting> options)
//    {
//        db = new DBRepository(options.CurrentValue.DbConn);
//    }

//    public Task<IEnumerable<CartItems>> GetCartItems() => db.GetCartItems();

//    public Task<CartItems> GetCartItemsByID(int id) => db.GetCartItemsByID(id);

//    public Task<int?> UpsertCartItems(CartItems cartItems) => db.UpsertCartItems(cartItems);

//}
