using GullSharksLib;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace PaymentDetailsController;

[ApiController]
public class PaymentDetailsController : ControllerBase {

    public readonly IUserRepository db;
    public PaymentDetailsController(IUserRepository ch)
    {
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetPaymentDetails")]
    public Task<IEnumerable<PaymentDetails>> GetPaymentDetails() => db.GetPaymentDetails();

    [HttpGet]
    [Route("[controller]/GetPaymentDetailsByID/{id}")]
    public Task<PaymentDetails> GetPaymentDetailsByID(int id) => db.GetPaymentDetailsByID(id);

    [HttpPost]
    [Route("[controller]/UpsertPaymentDetails")]
    public Task<int?> UpsertPaymentDetails(PaymentDetails paymentDetails) => db.UpsertPaymentDetails(paymentDetails);

}


