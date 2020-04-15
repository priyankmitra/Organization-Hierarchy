using System;
using System.Collections.Generic;

namespace OrganizationHierarchy.Models
{
    public partial class TempAd
    {
        public int EmployeeId { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string EmployeeUsername { get; set; }
        public string Department { get; set; }
    }
}
