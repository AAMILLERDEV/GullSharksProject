using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories;

public class BillingAddressRepository //: IBillingAddressRepository
{
    private readonly DBRepository db;

    public BillingAddressRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    //public Task<IEnumerable<BillingAddress>> GetBillingAddresses() => db.GetBillingAddresses();
    //public Task<BillingAddress> GetBillingAddressByID(int id) => db.GetBillingAddressesByID(id);
    //public Task<int?> UpsertBillingAddress(BillingAddress ins) => db.UpsertBillingAddress(billingAddress);
}

