using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace UserDetailsController;

[ApiController]
public class UserDetailsController : ControllerBase {

    public readonly IUserDetailsRepository db;
    public UserDetailsController(IUserDetailsRepository ch){
        this.db = ch;
    }


    [HttpGet]
    [Route("[controller]/GetUserDetails")]
    public Task<IEnumerable<UserDetails>> GetUserDetails() => db.GetAllUserDetails();

    [HttpGet]
    [Route("[controller]/GetUserDetailsByID/{id}")]
    public Task<UserDetails> GetUserDetailsByID(int id) => db.GetUserDetailsByID(id);

    [HttpPost]
    [Route("[controller]/UpsertUserDetails")]
    public Task<int?> UpsertUser(UserDetails user) => db.UpsertUserDetails(user);

}


