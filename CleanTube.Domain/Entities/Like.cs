using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanTube.Domain.Entities
{
    public class Like
    {
        public int Id { get; set; }

        public string UserId { get; set; } = string.Empty;

        public int VideoId { get; set; }

        public Video Video { get; set; } = null!;

        public DateTime CreatedAt { get; set; }
    }
}
