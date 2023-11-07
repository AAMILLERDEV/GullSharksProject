using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IOrderDetailsRepository
    {
        public Task<OrderDetails> GetOrderDetailsByID(int id);
        public Task<int?> UpsertOrderDetails(OrderDetails od);
    }
}
