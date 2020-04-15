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
        [HttpGet("registeredUsers")]
        public IEnumerable<RegisteredUsers> GetRegisteredUsers()
        {
            using (OrganizationHierarchyContext context = new OrganizationHierarchyContext())
            {
                return context.RegisteredUsers.ToList();
            }
        }
        OrganizationHierarchyContext context = new OrganizationHierarchyContext();

        [HttpGet("registeredUserInformation")]

        public IEnumerable<UserInformation> Getuser()
        {
            var result = (from a in context.RegisteredUsers
                              select new UserInformation
                              {
                                  EmployeeId = a.EmployeeId,
                                  DisplayName = a.DisplayName,
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

        [HttpGet("ad_data")]
        public List<TempAd> GetAD()
        {
            List<TempAd> machineUser = new List<TempAd>();
            var username = GetUserName().First();
            var result = context.TempAd.Where(X => X.EmployeeUsername.Contains(username)).FirstOrDefault();
            machineUser.Add(result);
            return machineUser;
        }
        public List<TempAd> GetAD(string username)
        {
            List<TempAd> machineUser = new List<TempAd>();
            var result = context.TempAd.Where(X => X.EmployeeUsername.Contains(username)).FirstOrDefault();
            machineUser.Add(result);
            return machineUser;
        }

        [HttpGet("isRegisteredUserOrNot")]
        public int? GetRegistration()
        {
            string username = GetUserName().First();
            var result = context.RegisteredUsers.Where(x => x.EmployeeUsername.Contains(username)).FirstOrDefault();
            if (result == null)
                return 0;
            else
                return result.UserRegisteredOrNot;
        }

        public int userPresentInRegistrationTableOrNot(string username)
        {
            int count = context.RegisteredUsers.Where(x => x.EmployeeUsername.Contains(username)).Count();
            return count;
        }

        public int RegisterNewUser(RegisteredUsers user)
        {
            if (userPresentInRegistrationTableOrNot(user.EmployeeUsername) == 0)
            {
                context.RegisteredUsers.Add(user);
                context.SaveChanges();
                return 1;
            }
            else if (userPresentInRegistrationTableOrNot(user.EmployeeUsername) > 0 && (GetRegistration()==0))
            {
                var updatedUser = context.RegisteredUsers.Find(user.EmployeeUsername);
                updatedUser.EmployeeId = user.EmployeeId;
                updatedUser.DisplayName = user.DisplayName;
                updatedUser.Email = user.Email;
                updatedUser.DepartmentId = user.DepartmentId;
                updatedUser.DesignationId = user.DesignationId;
                updatedUser.OfficeId = user.OfficeId;
                updatedUser.Profilepic = null; // user.Profilepic;
                updatedUser.ReportingManagerUsername = user.ReportingManagerUsername;
                updatedUser.UserRegisteredOrNot = 1;

                context.SaveChanges();
                return 1;
            }
            return 0;
        }

        [HttpPost]
        [Route("registerUser")]
        public int Post([FromForm]UserInformation user)
        {/*
            MyImages image = new MyImages { ImagePath = user1.Profilepic };
            
            Image_Context imgdb = new Image_Context();
            
            imgdb.MyImages.Add(image);
            imgdb.SaveChanges();*/
            //System.Diagnostics.Debug.WriteLine(user.DepartmentName.ToString());
            int departmentid = context.DepartmentInformation.Where(x => x.DepartmentName.Contains(user.DepartmentName)).FirstOrDefault().DepartmentId;
            int designationId = context.DesignationInformation.Where(x => x.Designation.Contains(user.Designation)).FirstOrDefault().DesignationId;
            int officeid = context.OfficeInformation.Where(x => x.OfficeName.Contains(user.Office)).FirstOrDefault().OfficeId;

            RegisteredUsers registeruser = new RegisteredUsers();
            registeruser.EmployeeId = user.EmployeeId;
            registeruser.DisplayName = user.DisplayName;
            registeruser.EmployeeUsername = user.EmployeeUsername;
            registeruser.Email = user.Email;
            registeruser.DepartmentId = departmentid;
            registeruser.DesignationId = designationId;
            registeruser.OfficeId = officeid;
            registeruser.UserRegisteredOrNot = 1;
            registeruser.ReportingManagerUsername = user.ReportingManagerUsername;

            if (userPresentInRegistrationTableOrNot(user.ReportingManagerUsername) >= 1)
            {
                return RegisterNewUser(registeruser);
            }
            else
            {
                RegisteredUsers manager = new RegisteredUsers();
                manager.EmployeeId = context.TempAd.Where(x => x.EmployeeUsername.Contains(user.ReportingManagerUsername)).FirstOrDefault().EmployeeId;  // work on this//GetAD(user.ReportingManagerUsername).First().EmployeeId;
                manager.DisplayName = "";
                manager.EmployeeUsername = user.ReportingManagerUsername;
                manager.UserRegisteredOrNot = 0;
                manager.Email = "null";
                manager.OfficeId = 0;
                manager.DepartmentId = 0;
                manager.DesignationId = 0;
                manager.ReportingManagerUsername = "sudhag";

                context.RegisteredUsers.Add(manager);
                context.SaveChanges();
                return RegisterNewUser(registeruser);
            }
        }
    }
}
