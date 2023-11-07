using GullSharksLib.Models;

namespace GullSharksLib;

public interface ICardTypeRepository
{
    public Task<IEnumerable<CardType>> GetCardTypes();
}
