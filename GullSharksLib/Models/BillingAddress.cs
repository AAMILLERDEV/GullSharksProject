using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GullSharksLib.Models
{
    public class BillingAddress
    {
        int ID { get; set; }
        int UserDetails_ID { get; set; }
        string City { get; set; }
        int Country_ID { get; set; }
        int Province_ID { get; set; }
        string PostalCode { get; set; }
        string StreetAddress { get; set; }
    }
}
