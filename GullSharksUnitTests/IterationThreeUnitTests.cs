using Xunit;
using GullSharksLib;
using GullSharksLib.Models;

namespace IterationThreeUnitTests;

public class IterationThreeUnitTests
{

    private readonly DBRepository db;

    public IterationThreeUnitTests()
    {
        db = new DBRepository("Server=;Database=DaBase;User ID=sa; Password=password;Trusted_Connection=True;");
    }

    [Fact]
    public async void GetEvents_AssertNotNull_Test01()
    {
        var events = await db.GetEvents();
        Assert.NotNull(events);
    }

    [Fact]
    public async void GetEventByUserID_AssertNotNull_Test02()
    {
        const int user_ID = 1;
        var user = await db.GetEventRegistry(user_ID);
        Assert.NotNull(user);
    }

    [Fact]
    public async void GetRatings_AssertNotNull_Test03()
    {
        var ratings = await db.GetRatings();
        Assert.NotNull(ratings);
    }

    [Fact]
    public async void GetGameReviews_AssertNotNull_Test04()
    { 
        var gameReviews = await db.GetGameReviews();
        Assert.NotNull(gameReviews);
    }

    [Fact]
    public async void GetEventNameByID1_AssertEqual_Test05()
    {
        List<Events> events = new List<Events>();
        events = (List<Events>)await db.GetEvents();
        
        var testEvent = events[0];
        
        Assert.Equal(testEvent.EventName, "Mario Bros 3 Event");
    }

    [Fact]
    public async void GetEventNameByID2_AssertEqual_Test06()
    {
        List<Events> events = new List<Events>();
        events = (List<Events>)await db.GetEvents();
        var testEvent = events[1];

        Assert.Equal(testEvent.EventName, "Horror Games Sale");
    }

    [Fact]
    public async void GetGameReviewsByUserID_AssertNotNull_Test07()
    {
        List<GameReview> gameReviews = new List<GameReview>();
        gameReviews = (List<GameReview>)await db.GetGameReviews();

        var user_id = 1;
        var gameReview = gameReviews[user_id - 1];

        Assert.NotNull(gameReview);
    }

    [Fact]
    public async void GetEventByID_AssertNotNull_Test08()
    {
        const int event_ID = 1;
        var testEvent = await db.GetEventRegistry(event_ID);
        Assert.NotNull(testEvent);
    }

    [Fact]
    public async void GetRatingByID_AssertNotNull_Test07()
    {
        List<Rating> ratings = new List<Rating>();
        ratings = (List<Rating>)await db.GetRatings();

        var id = 1;
        var rating = ratings[id - 1];

        Assert.NotNull(rating);
    }

    [Fact]
    public async void GetCategoryPreferences_AssertNotNull_Test10()
    {
        var user_ID = 1;
        var categoryPreferences = await db.GetCategoryPreferences(user_ID);
        Assert.NotNull(categoryPreferences);
    }

    [Fact]
    public async void GetLanguagePreferences_AssertNotNull_Test11()
    {
        var user_ID = 1;
        var languagePreferences = await db.GetLanguagePreferences(user_ID);
        Assert.NotNull(languagePreferences);
    }

    [Fact]
    public async void GetPlatformPreferences_AssertNotNull_Test12()
    {
        var user_ID = 1;
        var platformPreferences = await db.GetPlatformPreferences(user_ID);
        Assert.NotNull(platformPreferences);
    }
}
