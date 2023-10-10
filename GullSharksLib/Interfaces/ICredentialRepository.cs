using GullSharksLib.Models;

namespace GullSharksLib.Interfaces
{
    public interface ICredentialRepository
    {
        public Task<Credential> GetCredentialByID(int id);
        public Task<int?> UpsertCredential(Credential ins);
        public Task<bool> CheckCredentials(User user, string val);
    }
}
