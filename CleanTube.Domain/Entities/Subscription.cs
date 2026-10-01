using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanTube.Domain.Entities
{
    public class Subscription
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public int ChannelId { get; set; }

        public DateTime SubscribedAt { get; set; }

        public Channel Channel { get; set; } = null!;
    }
}
