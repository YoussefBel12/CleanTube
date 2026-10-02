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
    public class VideoConfiguration
     : IEntityTypeConfiguration<Video>
    {
        public void Configure(
            EntityTypeBuilder<Video> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(x => x.Description)
                .HasMaxLength(5000);

            builder.Property(x => x.VideoUrl)
                .IsRequired();

            builder.Property(x => x.ThumbnailUrl)
                .IsRequired();

            builder.Property(x => x.UploadedAt)
                .IsRequired();

            builder.HasOne(x => x.Channel)
                .WithMany(x => x.Videos)
                .HasForeignKey(x => x.ChannelId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Comments)
                .WithOne(x => x.Video)
                .HasForeignKey(x => x.VideoId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Likes)
                .WithOne(x => x.Video)
                .HasForeignKey(x => x.VideoId)
                .OnDelete(DeleteBehavior.Cascade);


            builder.HasIndex(x => x.ChannelId);

        }
    }
}
