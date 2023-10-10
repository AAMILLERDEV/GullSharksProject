using GullSharksLib.Interfaces;
using Microsoft.Extensions.Options;

namespace GullSharksLib;
public class LanguageRepository : ILanguageRepository
{
    private readonly IDBRepository db;

    public LanguageRepository(IOptionsMonitor<AppSetting> options)
    {
        db = new DBRepository(options.CurrentValue.DbConn);
    }

    public Task<IEnumerable<Language>> GetLanguages() => db.GetLanguages();
}

