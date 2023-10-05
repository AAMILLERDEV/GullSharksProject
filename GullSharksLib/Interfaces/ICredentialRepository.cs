using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface ICredentialRepository
    {
        public Task<IEnumerable<Credential>> GetCredientials();
        public Task<Credential> GetCredentialByID(int id);
        public Task<int?> UpsertCredential(Credential ins);
    }
}
