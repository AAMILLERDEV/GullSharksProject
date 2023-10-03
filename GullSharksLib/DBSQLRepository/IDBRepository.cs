namespace GullSharksLib;

public interface IDBRepository 
{
    public Task<IEnumerable<User>> GetUsers();
    public Task<User> GetUserByID(int id);
    public Task<int?> UpsertUser(User ins);
}