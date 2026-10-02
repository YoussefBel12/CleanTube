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
    public class SubscriptionConfiguration
    : IEntityTypeConfiguration<Subscription>
    {
        public void Configure(
            EntityTypeBuilder<Subscription> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Property(x => x.UserId)
                .IsRequired();

            builder.Property(x => x.SubscribedAt)
                .IsRequired();

            builder.HasOne(x => x.Channel)
                .WithMany(x => x.Subscriptions)
                .HasForeignKey(x => x.ChannelId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasIndex(x => new
            {
                x.UserId,
                x.ChannelId
            })
            .IsUnique();
        }
    }
}
