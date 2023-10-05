using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GullSharksLib.Models
{
    public class UserDetails
    {
        int ID { get; set; }
        string First_Name { get; set; }
        string Last_Name { get; set; }
        string Gender { get; set; }
        int User_ID { get; set; }
        string Birth_Date { get; set; }
        bool ReceivesEmailUpdates { get; set; }
        string PhoneNumber { get; set; }
    }
}
