using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class FriendsListRepository //: IFriendsListRepository
{
    private readonly IDBRepository db;

    public FriendsListRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    //public Task<IEnumerable<FriendsList>> GetFriendsListByUserID(int user_ID) => db.GetFriendsListByUserID(user_ID);
    //public Task<IEnumerable<FriendsList>> GetFriendsListByID(int id) => db.GetFriendsListByID(id);
    //public Task<int?> UpsertFriendsList(FriendsList friendsList) => db.UpsertFriendsList(friendsList);
}
