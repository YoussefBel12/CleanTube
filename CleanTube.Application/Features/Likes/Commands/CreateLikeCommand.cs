using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Likes.Commands
{
    public class CreateLikeCommand : IRequest<int>
    {
        public int VideoId { get; set; }
    }
}
