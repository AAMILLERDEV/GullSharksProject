//using GullSharksLib;
//using GullSharksLib.Models;
//using Microsoft.AspNetCore.Mvc;

//namespace CardTypeController;

//[ApiController]
//public class CardTypeController : ControllerBase {

//    public readonly ICardTypeRepository db;
//    public CardTypeController(ICardTypeRepository ch)
//    {
//        this.db = ch;
//    }


//    [HttpGet]
//    [Route("[controller]/GetCardTypes")]
//    public Task<IEnumerable<CardType>> GetCardTypes() => db.GetCardTypes();

//    [HttpPost]
//    [Route("[controller]/UpsertCardType")]
//    public Task<int?> UpsertCardType(CardType cardType) => db.UpsertCardType(cardType);

//}


