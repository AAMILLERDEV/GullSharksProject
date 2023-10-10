using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IShippingAddressRepository
    {
        public Task<ShippingAddress> GetShippingAddressByID(int id);
        public Task<int?> UpsertShippingAddress(ShippingAddress ins);
    }
}
