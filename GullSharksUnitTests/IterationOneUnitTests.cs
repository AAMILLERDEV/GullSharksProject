using Xunit;
using GullSharksLib;
namespace IterationOneUnitTests;

public class IterationOneUnitTests
{

    private readonly DBRepository db;

    public IterationOneUnitTests()
    {
        db = new DBRepository("Server=;Database=DaBase;User ID=sa; Password=password;Trusted_Connection=True;");
    }

    [Fact]
    public async void GetUsers_AssertNotNull_Test01()
    {
        var users = await db.GetUsers();
        Assert.NotNull(users);
    }

    [Fact]
    public async void GetUserByID_AssertNotNull_Test02()
    {
        const int user_ID = 1;
        var user = await db.GetUserByID(user_ID);
        Assert.NotNull(user);
    }

    [Fact]
    public async void GetGames_AssertNotNull_Test03()
    {
        var games = await db.GetGames();
        Assert.NotNull(games);
    }

    [Fact]
    public async void GetGamesByID_AssertNotNull_Test04()
    {
        const int game_ID = 11;
        var game = await db.GetGameByID(game_ID);
        Assert.NotNull(game);
    }

    [Fact]
    public async void GetUserDetailsByID_AssertNotNull_Test05()
    {
        var userDetail_ID = 1;
        var userDetail = await db.GetUserDetailsByID(userDetail_ID);
        Assert.NotNull(userDetail);
    }

    [Fact]
    public async void GetUserDetails_AssertNotNull_Test06()
    {
        var userDetails = await db.GetUserDetails();
        Assert.NotNull(userDetails);
    }

    /// 
   
    [Fact]
    public async void GetPlatforms_AssertNotNull_Test07()
    {
        var platforms = await db.GetPlatforms();
        Assert.NotNull(platforms);
    }

    [Fact]
    public async void GetCountries_AssertNotNull_Test08()
    {
        var countries = await db.GetCountries();
        Assert.NotNull(countries);
    }

    [Fact]
    public async void GetProvinces_AssertNotNull_Test09()
    {
        var provinces = await db.GetProvinces();
        Assert.NotNull(provinces);
    }

    [Fact]
    public async void GetCredentialByID_AssertNotNull_Test10()
    {
        var credential_ID = 1;
        var credential = await db.GetCredentialsByID(credential_ID);
        Assert.NotNull(credential);
    }

    [Fact]
    public async void GetShippingAddressByID_AssertNotNull_Test11()
    {
        const int shippingAddress_ID = 1;
        var shippingAddress = await db.GetShippingAddressByID(shippingAddress_ID);
        Assert.NotNull(shippingAddress);
    }

    [Fact]
    public async void GetBillingAddressByID_AssertNotNull_Test12()
    {
        var billingAddress_ID = 1;
        var billingAddress = await db.GetBillingAddressByID(billingAddress_ID);
        Assert.NotNull(billingAddress);
    }
}
