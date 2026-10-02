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
    public class CommentConfiguration
     : IEntityTypeConfiguration<Comment>
    {
        public void Configure(
            EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Content)
                .IsRequired()
                .HasMaxLength(1000);

            builder.Property(x => x.UserId)
                .IsRequired();

            builder.Property(x => x.CreatedAt)
                .IsRequired();

            builder.HasOne(x => x.Video)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.VideoId)
                .OnDelete(DeleteBehavior.Cascade);



            builder.HasIndex(x => x.VideoId);


        }
    }
}
