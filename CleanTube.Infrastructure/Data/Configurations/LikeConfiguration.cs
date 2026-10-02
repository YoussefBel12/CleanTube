using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanTube.Infrastructure.Data.Configurations
{
    public class LikeConfiguration
    : IEntityTypeConfiguration<Like>
    {
        public void Configure(
            EntityTypeBuilder<Like> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.UserId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Video)
                .WithMany(x => x.Likes)
                .HasForeignKey(x => x.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(x => new
            {
                x.UserId,
                x.VideoId
            })
            .IsUnique();
        }
    }
}
