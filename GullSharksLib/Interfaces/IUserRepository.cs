namespace GullSharksLib;

public interface IUserRepository
{
    public Task<IEnumerable<User>> GetUsers();
    public Task<User> GetUserByID(int id);
    public Task<int?> UpsertUser(User ins);
}
