using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IFriendsListRepository
    {
        public Task<IEnumerable<FriendsList>> GetFriendsListByUserID(int user_ID);
        public Task<IEnumerable<FriendsList>> GetFriendsList();
        public Task<int?> UpsertFriendsList(FriendsList friendsList);
    }
}
