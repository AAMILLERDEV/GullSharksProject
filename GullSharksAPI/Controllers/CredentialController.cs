using GullSharksLib;
using GullSharksLib.Interfaces;
using GullSharksLib.Models;
using Microsoft.AspNetCore.Mvc;

namespace CredentialController;

[ApiController]
public class CredentialController : ControllerBase
{
    public readonly ICredentialRepository db;
    public CredentialController(ICredentialRepository ch)
    {
        this.db = ch;
    }

    [HttpPost]
    [Route("[controller]/UpsertCredentials")]
    public Task<int?> UpsertCredentials(Credential cred) => db.UpsertCredential(cred);

    [HttpPost]
    [Route("[controller]/CheckCredentials/{val}")]
    public Task<bool> CheckCredentials(User user, string val) => db.CheckCredentials(user, val);
}

