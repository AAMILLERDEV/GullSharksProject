using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GullSharksLib.Models
{
    public class Preference
    {
        int ID { get; set; }
        int UserDetails_ID { get; set; }
        int Platform_ID { get; set; }
        int GameCategory_ID { get; set; }
        int LanguagePreferences_ID { get; set; }
    }
}
