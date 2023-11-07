using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class OrderDetailsRepository : IOrderDetailsRepository
{
    private readonly IDBRepository db;

    public OrderDetailsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<OrderDetails> GetOrderDetailsByID(int id) => db.GetOrderDetailsByID(id);
    public Task<int?> UpsertOrderDetails(OrderDetails od) => db.UpsertOrderDetails(od);
}

