using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IEmailRepository
    {
        public bool SendValidationEmail(User user);
    }
}
