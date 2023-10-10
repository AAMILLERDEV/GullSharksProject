using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class UserDetailsRepository : IUserDetailsRepository
    {
        private readonly IDBRepository db;

        public UserDetailsRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<IEnumerable<UserDetails>> GetAllUserDetails() => db.GetUserDetails();
        public Task<UserDetails> GetUserDetailsByID(int id) => db.GetUserDetailsByID(id);
        public Task<int?> UpsertUserDetails(UserDetails ins) => db.UpsertUserDetails(ins);
    }
}
