using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class OrderRepository : IOrderRepository
{
    private readonly IDBRepository db;

    public OrderRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Order>> GetOrders() => db.GetOrders();
    public Task<IEnumerable<Order>> GetOrdersByUserID(int user_ID) => db.GetOrdersByUserID(user_ID);
    public Task<int?> UpsertOrder(Order order) => db.UpsertOrder(order);
}

