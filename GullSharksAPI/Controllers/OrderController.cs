//using GullSharksLib;
//using GullSharksLib.Interfaces;
//using GullSharksLib.Models;
//using Microsoft.AspNetCore.Mvc;

//namespace OrderController;

//[ApiController]
//public class OrderController : ControllerBase
//{

//    public readonly IOrderRepository db;
//    public OrderController(IOrderRepository ch)
//    {
//        this.db = ch;
//    }


//    [HttpGet]
//    [Route("[controller]/GetOrders")]
//    public Task<IEnumerable<Order>> GetOrders() => db.GetOrders();

//    [HttpGet]
//    [Route("[controller]/GetOrderByID/{id}")]
//    public Task<Order> GetOrderByID(int id) => db.GetOrderByID(id);

//    [HttpPost]
//    [Route("[controller]/UpsertOrder")]
//    public Task<int?> UpsertOrder(Order order) => db.UpsertOrder(order);

//}
