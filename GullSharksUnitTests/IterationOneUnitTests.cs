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
    public async void GetAllUsers_AssertNotNull_Test()
    {
        var users = await db.GetUsers();
        Assert.NotNull(users);
    }

    [Fact]
    public async void GetUserByID_AssertNotNull_Test()
    {
        const int user_ID = 1;
        var user = await db.GetUserByID(user_ID);
        Assert.NotNull(user);
    }

    [Fact]
    public async void GetGames_AssertNotNull_Test()
    {
        var games = await db.GetGames();
        Assert.NotNull(games);
    }

    [Fact]
    public async void GetGamesByID_AssertNotNull_Test()
    {
        const int game_ID = 11;
        var game = await db.GetGameByID(game_ID);
        Assert.NotNull(game);
    }

    [Fact]
    public async void GetUserDetailByID_AssertNotNull_Test()
    {
        var userDetail_ID = 1;
        var userDetail = await db.GetUserDetailsByID(userDetail_ID);
        Assert.NotNull(userDetail);
    }

    [Fact]
    public async void GetPlatforms_AssertNotNull_Test()
    {
        var platforms = await db.GetPlatforms();
        Assert.NotNull(platforms);
    }
}
