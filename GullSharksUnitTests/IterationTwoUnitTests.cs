using Xunit;
using GullSharksLib;
namespace IterationTwoUnitTests;

public class IterationTwoUnitTests
{

    private readonly DBRepository db;

    public IterationTwoUnitTests()
    {
        db = new DBRepository("Server=;Database=DaBase;User ID=sa; Password=password;Trusted_Connection=True;");
    }

    [Fact]
    public async void GetGameDetails_AssertNotNull_Test01()
    {
        var gameDetails = await db.GetGameDetails();
        Assert.NotNull(gameDetails);
    }

    [Fact]
    public async void GetGameDetailsByID_AssertNotNull_Test02()
    {
        const int gameDetails_ID = 1;
        var gameDetails = await db.GetGameDetailsByID(gameDetails_ID);
        Assert.NotNull(gameDetails);
    }

    [Fact]
    public async void GetAssets_AssertNotNull_Test03()
    {
        var assets = await db.GetAssets();
        Assert.NotNull(assets);
    }

    [Fact]
    public async void GetPaymentDetailsByUserID_AssertNotNull_Test04()
    {
        const int user_ID = 1;
        var paymentDetails = await db.GetPaymentDetailsByUserID(user_ID);
        Assert.NotNull(paymentDetails);
    }

    [Fact]
    public async void GetWishlists_AssertNotNull_Test05()
    {
        var wishlist = await db.GetWishlists();
        Assert.NotNull(wishlist);
    }

    [Fact]
    public async void GetWishlistByUserID_AssertNotNull_Test06()
    {
        var user_ID = 1;
        var wishlist = await db.GetWishlistByUserID(user_ID);
        Assert.NotNull(wishlist);
    }

    [Fact]
    public async void GetFriendsList_AssertNotNull_Test07()
    {
        var friendsList = await db.GetFriendsList();
        Assert.NotNull(friendsList);
    }

    [Fact]
    public async void GetFriendsListByUserID_AssertNotNull_Test08()
    {
        var user_ID = 1;
        var friendsList = await db.GetFriendsListByUserID(user_ID);
        Assert.NotNull(friendsList);
    }

    [Fact]
    public async void GetCartItemsByID_AssertNotNull_Test09()
    {
        var user_ID = 1;
        var cartItems = await db.GetCartItems(user_ID);
        Assert.NotNull(cartItems);
    }

    [Fact]
    public async void GetCardTypes_AssertNotNull_Test10()
    {
        var cardTypes = await db.GetCardTypes();
        Assert.NotNull(cardTypes);
    }

    [Fact]
    public async void GetOrders_AssertNotNull_Test11()
    {
        var orders = await db.GetOrders();
        Assert.NotNull(orders);
    }

    [Fact]
    public async void GetOrdersByUserID_AssertNotNull_Test12()
    {
        var user_ID = 1;
        var orders = await db.GetOrdersByUserID(user_ID);
        Assert.NotNull(orders);
    }
}
