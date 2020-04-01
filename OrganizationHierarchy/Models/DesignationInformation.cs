using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrganizationHierarchy.Models
{
    public partial class DesignationInformation
    {
        public DesignationInformation()
        {
            RegisteredUsers = new HashSet<RegisteredUsers>();
        }
        [Key]
        public int DesignationId { get; set; }
        public string Designation { get; set; }

        public virtual ICollection<RegisteredUsers> RegisteredUsers { get; set; }
    }
}
