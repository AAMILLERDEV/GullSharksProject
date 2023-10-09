﻿using GullSharksLib;
using GullSharksLib.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace RatingController;

[ApiController]
public class RatingController : ControllerBase
{
    public readonly IRatingRepository db;
    public RatingController(IRatingRepository ch)
    {
        this.db = ch;
    }

    [HttpGet]
    [Route("[controller]/GetRatings")]
    public Task<IEnumerable<Rating>> GetRatings() => db.GetRatings();

    [HttpGet]
    [Route("[controller]/GetRatingByID/{id}")]
    public Task<Rating> GetRatingByID(int id) => db.GetRatingByID(id);

    [HttpPost]
    [Route("[controller]/UpsertRating")]
    public Task<int?> UpsertRating(Rating rating) => db.UpsertRating(rating);
}

