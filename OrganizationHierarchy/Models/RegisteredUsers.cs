using System;
using System.Collections.Generic;

namespace OrganizationHierarchy.Models
{
    public partial class RegisteredUsers
    {
        public int EmployeeId { get; set; }
        public string EmployeeUsername { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public byte[] Profilepic { get; set; }
        public int? UserRegisteredOrNot { get; set; }
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public string ReportingManagerUsername { get; set; }
        public int OfficeId { get; set; }

        public virtual DepartmentInformation Department { get; set; }
        public virtual DesignationInformation Designation { get; set; }
        public virtual OfficeInformation Office { get; set; }
    }
}
