﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OrganizationHierarchy.Models
{
    public partial class DepartmentInformation
    {
        public DepartmentInformation()
        {
            RegisteredUsers = new HashSet<RegisteredUsers>();
        }
        [Key]
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }

        public virtual ICollection<RegisteredUsers> RegisteredUsers { get; set; }
    }
}
