using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace OrderController;

[ApiController]
public class OrderController : ControllerBase
{

    public readonly IOrderRepository db;
    public OrderController(IOrderRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetOrders")]
    public Task<IEnumerable<Order>> GetOrders() => db.GetOrders();

    [HttpGet]
    [Route("[controller]/GetOrderByID/{user_ID}")]
    public Task<IEnumerable<Order>> GetOrderByID(int user_ID) => db.GetOrdersByUserID(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertOrder")]
    public Task<int?> UpsertOrder(Order order) => db.UpsertOrder(order);

}
