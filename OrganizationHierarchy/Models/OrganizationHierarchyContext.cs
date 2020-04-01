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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=localhost;Database=OrganizationHierarchy;Trusted_Connection=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DepartmentInformation>(entity =>
            {
                entity.HasKey(e => e.DepartmentId)
                    .HasName("PK__Departme__B2079BED68907966");

                entity.Property(e => e.DepartmentId).ValueGeneratedNever();

                entity.Property(e => e.DepartmentName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<DesignationInformation>(entity =>
            {
                entity.HasKey(e => e.DesignationId)
                    .HasName("PK__Designat__BABD60DE1739A448");

                entity.Property(e => e.DesignationId).ValueGeneratedNever();

                entity.Property(e => e.Designation)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<OfficeInformation>(entity =>
            {
                entity.HasKey(e => e.OfficeId)
                    .HasName("PK__OfficeIn__4B61932FB5873E18");

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
                entity.HasKey(e => e.EmployeeUsername)
                    .HasName("PK__Register__4710CB26D6A44611");

                entity.Property(e => e.EmployeeUsername)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
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
                    .HasConstraintName("FK__Registere__Depar__4AB81AF0");

                entity.HasOne(d => d.Designation)
                    .WithMany(p => p.RegisteredUsers)
                    .HasForeignKey(d => d.DesignationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Registere__Desig__4CA06362");

                entity.HasOne(d => d.Office)
                    .WithMany(p => p.RegisteredUsers)
                    .HasForeignKey(d => d.OfficeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__Registere__Offic__4BAC3F29");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
