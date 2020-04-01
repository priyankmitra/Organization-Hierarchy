using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace OrganizationHierarchy.Models
{
    public partial class RegisteredUsers
    {
        [Key]
        public string EmployeeUsername { get; set; }
        public string Email { get; set; }
        public string Profilepic { get; set; }
        public int? UserRegisteredOrNot { get; set; }
        
        public int DepartmentId { get; set; }
        public int DesignationId { get; set; }
        public string ReportingManagerUsername { get; set; }
        
        public int OfficeId { get; set; }
        
        [ForeignKey("DepartmentId")]
        public virtual DepartmentInformation Department { get; set; }
        [ForeignKey("DesignationId")]
        public virtual DesignationInformation Designation { get; set; }
        [ForeignKey("OfficeId")]
        public virtual OfficeInformation Office { get; set; }
    }
}
