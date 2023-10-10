using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;
using System.Net.Mail;

namespace GullSharksLib;

public class EmailRepository : IEmailRepository
{
    private readonly IDBRepository db;
    

    public EmailRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public bool SendValidationEmail(User user)
    {
        try
        {
            using SmtpClient smtpClient = new SmtpClient();

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(user.ID.ToString());
            var URL = $"http://localhost:4200/Validation/{System.Convert.ToBase64String(plainTextBytes)}";

            MailMessage message = new MailMessage()
            {
                Subject = "Welcome to CVGS! Validate Your Account With Us Today\n",
                Body = @$"Click the following URL to join us: <a href=\{URL}>Validation URL</a>",
                IsBodyHtml = true,
                Sender = new MailAddress("CVGS_Administration@gmail.com")
            };

            message.To.Add(user.Email);

            smtpClient.Send(message);

            smtpClient.Dispose();

            return true;

        } catch (Exception ex)
        {
            return false;
        }

    }
}