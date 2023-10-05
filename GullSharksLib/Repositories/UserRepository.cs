using Microsoft.Extensions.Options;

namespace GullSharksLib;

public class UserRepository : IUserRepository
{
    private readonly DBRepository db;

    public UserRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<User>> GetUsers() => db.GetUsers();

    public Task<User> GetUserByID(int id) => db.GetUserByID(id);

    public Task<int?> UpsertUser(User user) => db.UpsertUser(user);

}
