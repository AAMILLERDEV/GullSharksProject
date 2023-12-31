﻿using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;

public class GameRepository : IGameRepository
{
    private readonly IDBRepository db;

    public GameRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Game>> GetGames() => db.GetGames();
    public Task<int?> UpsertGame(Game game) => db.UpsertGame(game);
    public Task<bool> DeleteGame(int id, int gameDetailsID) => db.DeleteGameByID(id, gameDetailsID);
}