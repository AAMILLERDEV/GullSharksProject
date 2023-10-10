using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class ShippingAddressRepository : IShippingAddressRepository
    {
        private readonly IDBRepository db;

        public ShippingAddressRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }
        public Task<ShippingAddress> GetShippingAddressByID(int id) => db.GetShippingAddressByID(id);
        public Task<int?> UpsertShippingAddress(ShippingAddress ins) => db.UpsertShippingAddress(ins);
    }
}
