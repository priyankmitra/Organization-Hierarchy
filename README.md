# Organization-Hierarchy
To plot the organization hierarchy chart within the organization
Run these commands on Package Manager Console
1)Install-Package Microsoft.EntityFrameworkCore.SqlServer
2)Install-Package Microsoft.EntityFrameworkCore.Tools
3)scaffold-dbcontext "Server=localhost;Database=Library;Trusted_Connection=True" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Models -Tables Book
