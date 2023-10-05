using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class UserDetailsRepository : IUserDetailsRepository
    {
        private readonly DBRepository db;

        public UserDetailsRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        // public Task<IEnumerable<UserDetails>> GetAllUserDetails() => db.GetAllUserDetails();
        // public Task<UserDetails> GetUserDetailsByID(int id) => db.GetUserDetailsByID(id);
        // public Task<int?> UpsertUserDetails(UserDetails ins) => db.UpsertUserDetails(userDetails);
    }
}
