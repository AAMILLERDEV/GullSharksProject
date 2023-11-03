//using GullSharksLib;
//using GullSharksLib.Interfaces;
//using GullSharksLib.Models;
//using Microsoft.AspNetCore.Mvc;

//namespace FriendsListController;

//[ApiController]
//public class FriendsListController : ControllerBase
//{

//    public readonly IFriendsListRepository db;
//    public FriendsListController(IFriendsListRepository ch)
//    {
//        this.db = ch;
//    }


//    [HttpGet]
//    [Route("[controller]/GetFriendsListByUserID/{uid}")]
//    public Task<IEnumerable<FriendsList>> GetFriendsListByUserID(int user_ID) => db.GetFriendsListByUserID(user_ID);

//    [HttpGet]
//    [Route("[controller]/GetFriendsListByID/{id}")]
//    public Task<IEnumerable<FriendsList>> GetFriendsListByID(int id) => db.GetFriendsListByID(id);

//    [HttpPost]
//    [Route("[controller]/UpsertFriendsList")]
//    public Task<int?> UpsertFriendsList(FriendsList friendsList) => db.UpsertFriendsList(friendsList);
//}
