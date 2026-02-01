using System;
using System.Collections.Generic;
using Dal.database;
using Microsoft.EntityFrameworkCore;

namespace Dal;

public partial class HCProjectgittySaradinaChaniProjectDalDatabaseDbMdfContext : DbContext
{
    public HCProjectgittySaradinaChaniProjectDalDatabaseDbMdfContext()
    {
    }

    public HCProjectgittySaradinaChaniProjectDalDatabaseDbMdfContext(DbContextOptions<HCProjectgittySaradinaChaniProjectDalDatabaseDbMdfContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Table> Tables { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=H:\\c#\\ProjectGitty-SaraDina-Chani\\Project\\Dal\\database\\db.mdf;Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Table>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Table__3214EC078BDC8D5D");

            entity.ToTable("Table");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("firstName");
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("lastName");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
