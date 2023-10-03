using GullSharksLib;
using Microsoft.AspNetCore.Mvc;

namespace UserController;

[ApiController]
public class UserController : ControllerBase {

    public readonly IUserRepository db;
    public UserController(IUserRepository ch){
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetUsers")]
    public Task<IEnumerable<User>> GetUsers() => db.GetUsers();

    [HttpGet]
    [Route("[controller]/GetUserByID/{id}")]
    public Task<User> GetUserByID(int id) => db.GetUserByID(id);

    [HttpPost]
    [Route("[controller]/UpsertUser")]
    public Task<int?> UpsertUser(User user) => db.UpsertUser(user);

}


