//using GullSharksLib;
//using GullSharksLib.Interfaces;
//using GullSharksLib.Models;
//using Microsoft.AspNetCore.Mvc;

//namespace OrderDetailsController;

//[ApiController]
//public class OrderDetailsController : ControllerBase
//{

//    public readonly IOrderDetailsRepository db;
//    public OrderDetailsController(IOrderDetailsRepository ch)
//    {
//        this.db = ch;
//    }


//    [HttpGet]
//    [Route("[controller]/GetOrderDetails")]
//    public Task<IEnumerable<OrderDetails>> GetAllOrderDetails() => db.GetOrderDetails();

//    [HttpGet]
//    [Route("[controller]/GetOrderDetailsByID/{id}")]
//    public Task<OrderDetails> GetOrderDetailsByID(int id) => db.GetOrderDetailsByID(id);

//    [HttpPost]
//    [Route("[controller]/UpsertOrderDetails")]
//    public Task<int?> UpsertOrderDetails(OrderDetails od) => db.UpsertOrderDetails(od);

//}
