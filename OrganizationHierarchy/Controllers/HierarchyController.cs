using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using OrganizationHierarchy.Models;
namespace OrganizationHierarchy.Controllers
{
    [Route("api")]
    [ApiController]
    public class HierarchyController : ControllerBase
    {
        /*[HttpGet("registeredUsers")]
        public IEnumerable<RegisteredUsers> GetRegisteredUsers()
        {
            using (OrganizationHierarchyContext context = new OrganizationHierarchyContext())
            {
                return context.RegisteredUsers.ToList();
            }
        }*/

        [HttpGet("registeredUserInformation")]

        public IEnumerable<UserInformation> Getuser()
        {
            OrganizationHierarchyContext context = new OrganizationHierarchyContext();
            var result = (from a in context.RegisteredUsers
                              select new UserInformation
                              {
                                  EmployeeUsername = a.EmployeeUsername,
                                  Email = a.Email,
                                  Profilepic = a.Profilepic,
                                  ReportingManagerUsername = a.ReportingManagerUsername,
                                  UserRegisteredOrNot = a.UserRegisteredOrNot,
                                  DepartmentName = a.Department.DepartmentName,
                                  Designation = a.Designation.Designation,
                                  Office = a.Office.OfficeName,
                              } 
                         ).ToList();
            return result;
        }

        [HttpGet("username")]
        public List<string> GetUserName()
        {
            List<string> username = new List<string>();
            string machineName = System.Security.Principal.WindowsIdentity.GetCurrent().Name;

            char[] separator = { '\\' };
            username.Add((machineName.Split(separator, 2, StringSplitOptions.None))[1]);
            return username;
        }

       /* [HttpPost("registerUser")]
        public int RegisterUser(RegisteredUsers user)
        {
            System.Diagnostics.Debug.WriteLine(user.EmployeeUsername.ToString());
            //jsonString = "{ \"EmployeeUsername\":\"b\",\"Email\":\"a\",\"Profilepic\":\"a\",\"DepartmentId\":\"1\",\"DesignationId\":\"2\",\"OfficeId\":\"3\"}";
            // RegisteredUsers user = JsonConvert.DeserializeObject<RegisteredUsers>(jsonString);
            
            OrganizationHierarchyContext entity = new OrganizationHierarchyContext();
            entity.RegisteredUsers.Add(user);
            entity.SaveChanges();
            return 1; 
        }*/

        [HttpPost]
        [Route("registerUser")]
        public int Post([FromForm]UserInformation user)
        {
            OrganizationHierarchyContext context = new OrganizationHierarchyContext();
            //System.Diagnostics.Debug.WriteLine(user.DepartmentName.ToString());
            var isManagerRegistered = false;
            int manager = context.RegisteredUsers.Where(x => x.EmployeeUsername.Contains(user.ReportingManagerUsername)).Count();
            if (manager > 0)
                isManagerRegistered = true;

            int departmentid = context.DepartmentInformation.Where(x => x.DepartmentName.Contains(user.DepartmentName)).FirstOrDefault().DepartmentId;
            //System.Diagnostics.Debug.WriteLine(user.Departmentname.ToString());
            int designationId = context.DesignationInformation.Where(x => x.Designation.Contains(user.Designation)).FirstOrDefault().DesignationId;
            int officeid = context.OfficeInformation.Where(x => x.OfficeName.Contains(user.Office)).FirstOrDefault().OfficeId;
            
            RegisteredUsers registeruser = new RegisteredUsers();
            registeruser.EmployeeUsername = user.EmployeeUsername;
            registeruser.Email = user.Email;
            registeruser.DepartmentId = departmentid;
            registeruser.DesignationId = designationId;
            registeruser.OfficeId = officeid;
            registeruser.UserRegisteredOrNot = 1;
            registeruser.ReportingManagerUsername = "Anil K Modest";
            /*RegisteredUsers Ruser = null;
            RegisteredUsers user = JsonConvert.DeserializeObject<RegisteredUsers>(userstring);*/
            context.RegisteredUsers.Add(registeruser);
            context.SaveChanges();
            return 1;
        }


    }


}
