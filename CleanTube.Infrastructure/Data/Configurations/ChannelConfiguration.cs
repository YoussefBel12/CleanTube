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
    public class ChannelConfiguration
    : IEntityTypeConfiguration<Channel>
    {
        public void Configure(
            EntityTypeBuilder<Channel> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(x => x.OwnerId)
                .IsRequired();

            builder.HasMany(x => x.Videos)
                .WithOne(x => x.Channel)
                .HasForeignKey(x => x.ChannelId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasMany(x => x.Subscriptions)
                .WithOne(x => x.Channel)
                .HasForeignKey(x => x.ChannelId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
