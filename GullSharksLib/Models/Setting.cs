using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GullSharksLib.Models
{
    public class Setting // lookup table
    {
        int ID { get; set; }
        string SettingKey { get; set; }
        string SettingValue { get; set; }
        bool IsReadOnly { get; set; }
    }
}
