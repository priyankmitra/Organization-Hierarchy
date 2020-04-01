create table DepartmentInformation(DepartmentId int primary key, DepartmentName varchar(50) not null);

create table OfficeInformation(OfficeId int primary key, OfficeName varchar(50), Region varchar(50));

create table DesignationInformation(DesignationId int primary key, Designation varchar(50) not null);


create table RegisteredUsers
(
	EmployeeUsername varchar(50) primary key, Email varchar(50) not null, Profilepic varchar(50) , UserRegisteredOrNot int default 0,
	DepartmentId int not null, DesignationId int not null, ReportingManagerUsername varchar(50) not null,OfficeId int not null, 
	foreign key(DepartmentId) references DepartmentInformation(DepartmentId), 
	foreign key(OfficeId) references OfficeInformation(OfficeId),
	foreign key(DesignationId) references DesignationInformation(DesignationId)
);

insert into DepartmentInformation 
values(1,'IT'),(2,'Accounts');

select * from DepartmentInformation;

insert into OfficeInformation
values(1,'Backoffice Center-1','Sitapura,Jaipur'),
(2,'Backoffice Center-2','Sitapura,Jaipur'),
(3,'Backoffice Center-3','Lal Kothi,Jaipur'),
(4,'Corporate headquarters','Oakbrook Terrace, IL');

select * from OfficeInformation;

insert into DesignationInformation 
values(1,'Chief Technology Officer'),
(2,'Vice President'),
(3,'Assistant Vice President'),
(5,'Technical Architect'),
(6,'Project Manager'),
(7,'Technical Lead'),
(8,'Senior Software Engineer'),
(9,'Software Engineer'),
(10,'Trainee Software Engineer'),
(11,'Software Engineer Intern');

select * from DesignationInformation;

insert into RegisteredUsers
values
('Sudha Gupta', 'sudhag@navbackoffice.com','',1,1,1,'NAV',4),
('Mukesh Singhal','mukeshs@navbackoffice.com','',1,1,2,'Sudha Gupta',1),
('Anil K Modest', 'anilk@navbackoffice.com','',1,1,2,'Sudha Gupta',1),
('Manoj Baijal','manojb@navbackoffice.com','',1,1,5,'Mukesh Singhal',1),
('Ajay Dixit','ajayd@navbackoffice.com','',1,1,7,'Manoj Baijal',1),
('Priyank Mitra', 'priyankm@navbackoffice.com','',1,1,11,'Anil K Modest',1)
;

insert into RegisteredUsers values ('Akash Tanwar', 'akasht@navbackoffice.com','',1,1,11,'Anil K Modest',1);
insert into RegisteredUsers values ('PRIYANK MITRA', 'priyankm@navbackoffice.com','',1,1,11,'Anil K Modest',1);
insert into RegisteredUsers values ('Sajal Gupta', 'sajag@navbackoffice.com','',1,1,11,'Anil K Modest',1);
insert into RegisteredUsers values ('Manoj Baijal','manojb@navbackoffice.com','',1,1,5,'Mukesh Singhal',1);
insert into RegisteredUsers values ('Raj Malhotra','manojb@navbackoffice.com','',1,1,5,'Mukesh Singhal',1);
select * from RegisteredUsers;

delete from RegisteredUsers where EmployeeUsername = 'Priyank Mitra';

delete from RegisteredUsers where EmployeeUsername = 'Manoj Baijal';