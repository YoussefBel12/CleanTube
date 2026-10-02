using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Likes.Queries
{
    public class IsLikedQuery : IRequest<bool>
    {
        public int VideoId { get; set; }
    }
}
