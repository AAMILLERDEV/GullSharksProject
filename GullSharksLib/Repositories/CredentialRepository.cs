using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;
using System.Net;

namespace GullSharksLib.Repositories
{
    public class CredentialRepository : ICredentialRepository
    {
        private readonly IDBRepository db;

        public CredentialRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<Credential> GetCredentialByID(int id) => db.GetCredentialsByID(id);
        public Task<int?> UpsertCredential(Credential ins) => db.UpsertCredentials(ins);
        public async Task<bool> CheckCredentials(User user, string val)
        {
            if (val == null)
            {
                return false;
            }

            var user_creds = await db.GetCredentialsByID(user.Credentials_ID);

            if (user_creds == null)
            {
                return false;
            }

            var dbCheck = Convert.FromBase64String(user_creds.CredentialValue).ToString();
            var valCheck = Convert.FromBase64String(val).ToString();

            if (dbCheck == valCheck)
            {
                return true;
            }

            return false;
        }
    }
}
