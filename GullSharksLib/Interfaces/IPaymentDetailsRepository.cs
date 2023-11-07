using GullSharksLib.Models;

namespace GullSharksLib;

public interface IPaymentDetailsRepository
{
    public Task<IEnumerable<PaymentDetails>> GetPaymentDetails(int user_ID);
    public Task<int?> UpsertPaymentDetails(PaymentDetails ins);
}
