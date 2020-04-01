using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrganizationHierarchy.Models
{
    public partial class OfficeInformation
    {
        public OfficeInformation()
        {
            RegisteredUsers = new HashSet<RegisteredUsers>();
        }
        [Key]
        public int OfficeId { get; set; }
        public string OfficeName { get; set; }
        public string Region { get; set; }

        public virtual ICollection<RegisteredUsers> RegisteredUsers { get; set; }
    }
}
