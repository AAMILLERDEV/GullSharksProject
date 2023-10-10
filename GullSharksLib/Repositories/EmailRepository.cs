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
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
            using SmtpClient smtpClient = new SmtpClient("smtp-mail.outlook.com", 587);

            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(user.ID.ToString());
            var URL = $"http://localhost:4200/Validation/{System.Convert.ToBase64String(plainTextBytes)}";

            MailMessage message = new MailMessage()
            {
                Subject = "Welcome to CVGS! Validate Your Account With Us Today",
                Body = $"Click the following URL to join us: <a href={URL}>Validation URL</a>",
                IsBodyHtml = true,
                From = new MailAddress("conestoga_CVGS_Mgmt@outlook.com")
            };

            smtpClient.EnableSsl = true;
            smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
            smtpClient.Credentials = new System.Net.NetworkCredential("conestoga_CVGS_Mgmt@outlook.com", "aaronmiller8096");
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