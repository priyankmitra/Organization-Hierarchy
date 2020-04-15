using System;
using System.Collections.Generic;

namespace OrganizationHierarchy.Models
{
    public partial class OfficeInformation
    {
        public OfficeInformation()
        {
            RegisteredUsers = new HashSet<RegisteredUsers>();
        }

        public int OfficeId { get; set; }
        public string OfficeName { get; set; }
        public string Region { get; set; }

        public virtual ICollection<RegisteredUsers> RegisteredUsers { get; set; }
    }
}
