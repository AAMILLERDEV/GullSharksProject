using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib;

public class PaymentDetailsRepository : IPaymentDetailsRepository
{
    private readonly IDBRepository db;

    public PaymentDetailsRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<PaymentDetails>> GetPaymentDetails(int user_ID) => db.GetPaymentDetailsByUserID(user_ID);

    public Task<int?> UpsertPaymentDetails(PaymentDetails paymentDetails) => db.UpsertPaymentDetails(paymentDetails);

}
