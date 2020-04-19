using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
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

            string profilepicPath = null;
            List<UserInformation> result = new List<UserInformation>();
            foreach (var item in context.RegisteredUsers)
            {
                OrganizationHierarchyContext db = new OrganizationHierarchyContext();
                string imreBase64Data = Convert.ToBase64String(item.Profilepic);
                profilepicPath = string.Format("data:image/png;base64,{0}", imreBase64Data);

                Console.WriteLine(item);
                UserInformation user = new UserInformation();


                user.EmployeeId = item.EmployeeId;
                user.DisplayName = item.DisplayName;
                user.EmployeeUsername = item.EmployeeUsername;
                user.Email = item.Email;
                user.ProfilepicPath = profilepicPath;
                user.ReportingManagerUsername = item.ReportingManagerUsername;
                user.UserRegisteredOrNot = item.UserRegisteredOrNot;
                user.DepartmentName = db.DepartmentInformation.Where(x => x.DepartmentId.Equals(item.DepartmentId)).FirstOrDefault().DepartmentName;  //item.Department.DepartmentName,
                user.Designation = db.DesignationInformation.Where(x => x.DesignationId.Equals(item.DesignationId)).FirstOrDefault().Designation; //item.Designation.Designation,
                user.Office = db.OfficeInformation.Where(x => x.OfficeId.Equals(item.OfficeId)).FirstOrDefault().OfficeName;//item.Office.OfficeName,

                
                result.Add(user);
                db.Dispose();

            }

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
            else if (userPresentInRegistrationTableOrNot(user.EmployeeUsername) > 0 && ((GetRegistration() == 0) || (GetRegistration() == 1)))
            {
                context.RegisteredUsers.Remove(context.RegisteredUsers.FirstOrDefault(e => e.EmployeeUsername == user.EmployeeUsername));
                context.SaveChanges();
                context.RegisteredUsers.Add(user);
                context.SaveChanges();
                return 1;
            }
            
            return 0;
        }

        [HttpPost]
        [Route("registerUser")]
        public async System.Threading.Tasks.Task<int> PostAsync([FromForm]UserInformation user)
        {
            
            int departmentid = context.DepartmentInformation.Where(x => x.DepartmentName.Contains(user.DepartmentName)).FirstOrDefault().DepartmentId;
            int designationId = context.DesignationInformation.Where(x => x.Designation.Contains(user.Designation)).FirstOrDefault().DesignationId;
            int officeid = context.OfficeInformation.Where(x => x.OfficeName.Contains(user.Office)).FirstOrDefault().OfficeId;
            RegisteredUsers registeruser = new RegisteredUsers();
            using (var stream = new MemoryStream())
            {
                await user.Profilepic.CopyToAsync(stream);
                registeruser.Profilepic = stream.ToArray();
            }

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
                manager.Profilepic = Array.Empty<byte>();
                manager.ReportingManagerUsername = "sudhag";

                context.RegisteredUsers.Add(manager);
                context.SaveChanges();
                return RegisterNewUser(registeruser);
            }
        }

        [HttpGet]
        [Route("rm_data")]
        public List<RMDATA> GetRmData()
        {
            List<RMDATA> rm_data = new List<RMDATA>();

            foreach (var user in context.TempAd)
            {

                RMDATA rm = new RMDATA();
                rm.DisplayName = user.DisplayName;
                rm.EmployeeId = user.EmployeeId;
                rm.EmployeeUsername = user.EmployeeUsername;

                rm_data.Add(rm);

            }

            return rm_data;
        }

        }
    }