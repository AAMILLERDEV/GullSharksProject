using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IUserDetailsRepository
    {
        public Task<IEnumerable<UserDetails>> GetAllUserDetails();
        public Task<UserDetails> GetUserDetailsByID(int id);
        public Task<int?> UpsertUserDetails(UserDetails ins);
    }
}
