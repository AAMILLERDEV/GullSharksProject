using GullSharksLib.Models;

namespace GullSharksLib.Interfaces;

public interface IBillingAddressRepository
{
    public Task<IEnumerable<BillingAddress>> GetBillingAddresses();
    public Task<User> GetBillingAddressByID(int id);
    public Task<int?> UpsertBillingAddress(BillingAddress ins);
}

