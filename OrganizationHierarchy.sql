create table DepartmentInformation(DepartmentId int primary key, DepartmentName varchar(50) not null);

create table OfficeInformation(OfficeId int primary key, OfficeName varchar(50), Region varchar(50));

create table DesignationInformation(DesignationId int primary key, Designation varchar(50) not null);


create table RegisteredUsers
(
	EmployeeId int primary key, EmployeeUsername varchar(50) not null unique,DisplayName varchar (50),  Email varchar(50) not null, Profilepic varchar(50) ,
	UserRegisteredOrNot int default 0,
	DepartmentId int not null, DesignationId int not null, ReportingManagerUsername varchar(50) not null,OfficeId int not null, 
	foreign key(DepartmentId) references DepartmentInformation(DepartmentId), 
	foreign key(OfficeId) references OfficeInformation(OfficeId),
	foreign key(DesignationId) references DesignationInformation(DesignationId)
);


insert into DepartmentInformation values
(0,'null'),(1,'IT'),(2,'Accounts');

select * from DepartmentInformation;


insert into OfficeInformation
values
(0,'null','null'),
(1,'Backoffice Center-1','Sitapura,Jaipur'),
(2,'Backoffice Center-2','Sitapura,Jaipur'),
(3,'Backoffice Center-3','Lal Kothi,Jaipur'),
(4,'Corporate headquarters','Oakbrook Terrace, IL');

select * from OfficeInformation;

insert into DesignationInformation 
values
(0,'null'),
(1,'CTO'),
(2,'VP'),
(3,'AVP'),
(5,'Technical Architect'),
(6,'Project Manager'),
(7,'Tech Lead'),
(8,'Senior Software Engineer'),
(9,'Software Engineer'),
(10,'Trainee Software Engineer'),
(11,'Intern');

select * from DesignationInformation;

insert into RegisteredUsers
values 
(1,'sudhag','Sudha Gupta', 'sudhag@navbackoffice.com','',1,1,1,'NAV',4),
(2,'mukeshs','Mukesh Singhal','mukeshs@navbackoffice.com','',1,1,5,'sudhag',1),
(3,'anilkm','Anil K Modest', 'anilk@navbackoffice.com','',1,1,5,'sudhag',1),
(4,'manojb','Manoj Baijal','manojb@navbackoffice.com','',1,1,6,'mukeshs',1),
(5,'ajayd','Ajay Dixit','ajayd@navbackoffice.com','',1,1,7,'manojb',1),
(8,'PRIYANK MITRA','Priyank Mitra', 'priyankm@navbackoffice.com','',1,1,11,'anilkm',1),
(9, 'akasht','Akash Tanwar', 'akasht@navbackoffice.com','',1,1,11,'anilkm',1),
(7,'sajalg','Sajal Gupta', 'sajag@navbackoffice.com','',1,1,11,'anilkm',1)
;

select * from RegisteredUsers;

delete from RegisteredUsers where EmployeeUsername = 'Priyank Mitra';
delete from RegisteredUsers where EmployeeUsername = 'virats';


create table TempAd
(
EmployeeId int primary key,  DisplayName varchar(50) , Email varchar(50) not null,
EmployeeUsername varchar (50), Department varchar (50)
);

insert into TempAd
values
(1,'Sudha Gupta', 'sudhag@navbackoffice.com','sudhag','IT'),
(2,'Mukesh Singhal','mukeshs@navbackoffice.com','mukeshs','IT'),
(3,'Anil K Modest', 'anilk@navbackoffice.com','anilkm','IT'),
(4,'Manoj Baijal','manojb@navbackoffice.com','manojb','IT'),
(5,'Ajay Dixit','ajayd@navbackoffice.com','ajayd','IT'),
(6,'Shubham Kumar', 'shubhamk@navbackoffice.com','shubhamk','IT'),
(7,'Sajal Gupta','sajalg@navbackoffice.com','sajalg','IT'),
(8,'PRIYANK MITRA','priyankm@navbackoffice.com','PRIYANK MITRA','IT'),
(9,'Aakash Tanwar','aakasht@navbackoffice.com','aakasht','IT'),
(10,'Ayush Goyal','ayushg@navbackoffice.com','ayushg','IT'),
(11,'Tushar Bansal','tusharb@navbackoffice.com','tusharb','IT'),
(12,'Chirag Sharma','chirags@navbackoffice.com','chirags','IT'),
(13,'Honey Singhal','honeys@navbackoffice.com','honeys','IT'),
(14,'Suyash Pathak','suyashp@navbackoffice.com','suyashp','IT'),
(15,'Prayag Donariya','prayagd@navbackoffice.com','prayagd','IT'),
(16,'Yash Kumar','yashk@navbackoffice.com','yashk','IT'),
(17,'Virat Singh','virats@navbackoffice.com','virats','IT');

delete from TempAd where EmployeeId = 8;
insert into TempAd values (8,'Priyank Mitra','priyankm@navbackoffice.com','PRIYANK MITRA','IT');


select * from TempAd;