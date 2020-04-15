using System;
using System.Collections.Generic;

namespace OrganizationHierarchy.Models
{
    public partial class DesignationInformation
    {
        public DesignationInformation()
        {
            RegisteredUsers = new HashSet<RegisteredUsers>();
        }

        public int DesignationId { get; set; }
        public string Designation { get; set; }

        public virtual ICollection<RegisteredUsers> RegisteredUsers { get; set; }
    }
}
