using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class OrderRepository //: IOrderRepository
{
    private readonly IDBRepository db;

    public OrderRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    //public Task<IEnumerable<Order>> GetOrders() => db.GetOrders();
    //public Task<Order> GetOrderByID(int id) => db.GetOrderByID(id);
    //public Task<int?> UpsertOrder(Order order) => db.UpsertOrder(order);
}

