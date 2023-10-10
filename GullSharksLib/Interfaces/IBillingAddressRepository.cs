using GullSharksLib.Models;

namespace GullSharksLib.Interfaces;

public interface IBillingAddressRepository
{
    public Task<BillingAddress> GetBillingAddressByID(int id);
    public Task<int?> UpsertBillingAddress(BillingAddress ins);
}

