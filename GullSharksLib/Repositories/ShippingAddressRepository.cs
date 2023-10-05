using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class ShippingAddressRepository //: IShippingAddressRepository
    {
        private readonly DBRepository db;

        public ShippingAddressRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<ShippingAddress>> GetShippingAddresses() => db.GetShippingAddresses();
        // public Task<ShippingAddress> GetShippingAddressByID(int id) => db.GetShippingAddressByID(id);
        // public Task<int?> UpsertShippingAddress(ShippingAddress ins) => db.UpsertShippingAddress(shippingAddress);
    }
}
