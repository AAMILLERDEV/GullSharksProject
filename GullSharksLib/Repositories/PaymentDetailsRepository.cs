//using GullSharksLib.Models;
//using Microsoft.Extensions.Options;

//namespace GullSharksLib;

//public class PaymentDetailsRepository : IPaymentDetailsRepository
//{
//    private readonly IDBRepository db;

//    public PaymentDetailsRepository(IOptionsMonitor<AppSetting> options)
//    {
//        db = new DBRepository(options.CurrentValue.DbConn);
//    }

//    public Task<IEnumerable<PaymentDetails>> GetPaymentDetails() => db.GetPaymentDetails();

//    public Task<PaymentDetails> GetPaymentDetailsByID(int id) => db.GetPaymentDetailsByID(id);

//    public Task<int?> UpsertPaymentDetails(UPaymentDetails paymentDetails) => db.UpsertPaymentDetails(paymentDetails);

//}
