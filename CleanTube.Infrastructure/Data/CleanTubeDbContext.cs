using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;
using CleanTube.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CleanTube.Infrastructure.Data
{
    public class CleanTubeDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
    {
        public CleanTubeDbContext(DbContextOptions<CleanTubeDbContext> options)
      : base(options)
        {
        }

        public DbSet<Channel> Channels => Set<Channel>();
        public DbSet<Video> Videos => Set<Video>();
        public DbSet<Comment> Comments => Set<Comment>();
        public DbSet<Like> Likes { get; set; }
        public DbSet<Subscription> Subscriptions => Set<Subscription>();






        protected override void OnModelCreating(
    ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(
                typeof(CleanTubeDbContext).Assembly);
        }




    }
}
