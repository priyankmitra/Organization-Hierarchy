using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace OrganizationHierarchy.Models
{
    public partial class OrganizationHierarchyContext : DbContext
    {
        public OrganizationHierarchyContext()
        {
        }

        public OrganizationHierarchyContext(DbContextOptions<OrganizationHierarchyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<DepartmentInformation> DepartmentInformation { get; set; }
        public virtual DbSet<DesignationInformation> DesignationInformation { get; set; }
        public virtual DbSet<OfficeInformation> OfficeInformation { get; set; }
        public virtual DbSet<RegisteredUsers> RegisteredUsers { get; set; }
        public virtual DbSet<TempAd> TempAd { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Data Source=.;Initial Catalog=OrganizationHierarchy;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DepartmentInformation>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PK__Departme__B2079BED6C882C18");

                entity.Property(e => e.DepartmentId).ValueGeneratedNever();

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DesignationInformation>(entity =>
            {
                entity.HasKey(e => e.DesignationId)
                    .HasName("PK__Designat__BABD60DEA03C0DCB");

                entity.Property(e => e.DesignationId).ValueGeneratedNever();

                entity.Property(e => e.Designation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OfficeInformation>(entity =>
            {
                entity.HasKey(e => e.OfficeId)
                    .HasName("PK__OfficeIn__4B61932FF41DC2B0");

                entity.Property(e => e.OfficeId).ValueGeneratedNever();

                entity.Property(e => e.OfficeName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Region)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RegisteredUsers>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__Register__7AD04F112AFFA511");

                entity.HasIndex(e => e.EmployeeUsername)
                    .HasName("UQ__Register__4710CB27ABEDA5F2")
                    .IsUnique();

                entity.Property(e => e.EmployeeId).ValueGeneratedNever();

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeUsername)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Profilepic)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ReportingManagerUsername)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserRegisteredOrNot).HasDefaultValueSql("((0))");

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.RegisteredUsers)
                    .HasForeignKey(d => d.DepartmentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Registere__Depar__1F98B2C1");

                entity.HasOne(d => d.Designation)
                    .WithMany(p => p.RegisteredUsers)
                    .HasForeignKey(d => d.DesignationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Registere__Desig__2180FB33");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.RegisteredUsers)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Registere__Offic__208CD6FA");
            });

            modelBuilder.Entity<TempAd>(entity =>
            {
                entity.HasKey(e => e.EmployeeId)
                    .HasName("PK__TempAd__7AD04F11D83990EE");

                entity.Property(e => e.EmployeeId).ValueGeneratedNever();

                entity.Property(e => e.Department)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DisplayName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmployeeUsername)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
