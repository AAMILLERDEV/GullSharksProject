using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface IFriendListRepository
    {
        public Task<IEnumerable<FriendsList>> GetFriendsListByUserID(int user_ID);
        public Task<IEnumerable<FriendsList>> GetFriendsListByID(int id);
        public Task<int?> UpsertFriendsList(FriendsList friendsList);
    }
}
