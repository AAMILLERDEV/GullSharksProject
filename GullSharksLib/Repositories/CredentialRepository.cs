﻿using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.Extensions.Options;

namespace GullSharksLib.Repositories
{
    public class CredentialRepository : ICredentialRepository
    {
        private readonly IDBRepository db;

        public CredentialRepository(IOptionsMonitor<AppSetting> options)
        {
            db = new DBRepository(options.CurrentValue.DbConn);
        }

        public Task<IEnumerable<Credential>> GetCredientials() => db.GetCredentials();
        public Task<Credential> GetCredentialByID(int id) => db.GetCredentialByID(id);
        public Task<int?> UpsertCredential(Credential ins) => db.UpsertCredential(credential);
    }
}
