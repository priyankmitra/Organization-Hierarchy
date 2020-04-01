namespace OrganizationHierarchy.Models
{
    public class UserInformation
    {
        public string EmployeeUsername { get;  set; }
        public string Email { get;  set; }
        public string Profilepic { get;  set; }
        public string ReportingManagerUsername { get;  set; }
        public int? UserRegisteredOrNot { get;  set; }
        public string Designation { get;  set; }
        public string DepartmentName { get;  set; }
        public string Office { get;  set; }
        public string Region { get;  set; }

    }
}