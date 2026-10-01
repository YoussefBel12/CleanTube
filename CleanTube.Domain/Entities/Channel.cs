using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanTube.Domain.Entities
{
    public class Channel
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string OwnerId { get; set; } = string.Empty;
        public ICollection<Video> Videos { get; set; } = new List<Video>();
        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    }
}
