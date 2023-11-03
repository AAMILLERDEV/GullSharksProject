//using GullSharksLib.Models;
//using Microsoft.Extensions.Options;

//namespace GullSharksLib;

//public class CardTypeRepository : ICardTypeRepository
//{
//    private readonly IDBRepository db;

//    public CardTypeRepository(IOptionsMonitor<AppSetting> options)
//    {
//        db = new DBRepository(options.CurrentValue.DbConn);
//    }

//    public Task<IEnumerable<CardType>> GetCardTypes() => db.GetCardTypes();

//    public Task<int?> UpsertCardType(CardType cardType) => db.UpsertCardType(cardType);

//}
