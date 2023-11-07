using GullSharksLib;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace PaymentDetailsController;

[ApiController]
public class PaymentDetailsController : ControllerBase
{

    public readonly IPaymentDetailsRepository db;
    public PaymentDetailsController(IPaymentDetailsRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetPaymentDetails/{user_ID}")]
    public Task<IEnumerable<PaymentDetails>> GetPaymentDetailsByUserID(int user_ID) => db.GetPaymentDetails(user_ID);

    [HttpPost]
    [Route("[controller]/UpsertPaymentDetails")]
    public Task<int?> UpsertPaymentDetails(PaymentDetails paymentDetails) => db.UpsertPaymentDetails(paymentDetails);

}


