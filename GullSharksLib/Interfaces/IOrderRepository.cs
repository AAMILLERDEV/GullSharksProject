using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IOrderRepository
    {
        public Task<IEnumerable<Order>> GetOrders();
        public Task<IEnumerable<Order>> GetOrdersByUserID(int user_ID);
        public Task<int?> UpsertOrder(Order order);
    }
}
