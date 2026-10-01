using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanTube.Domain.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }

        public string UserId { get; set; } = string.Empty;

        public int VideoId { get; set; }

        public Video Video { get; set; } = null!;
    }
}
