using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace EventController;

[ApiController]
public class EmailController : ControllerBase
{
    public readonly IEmailRepository db;
    public EmailController(IEmailRepository ch)
    {
        this.db = ch;
    }


    [HttpPost]
    [Route("[controller]/SendValidationEmail")]
    public bool SendValidationEmail(User user) => db.SendValidationEmail(user);

    [HttpPost]
    [Route("[controller]/SendResetPasswordEmail")]
    public Task<bool> SendResetPasswordEmail(User user) => db.SendResetPasswordEmail(user);



}
