using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;

namespace CleanTube.Application.Features.Comments.Commands
{
    public class CreateCommentCommand : IRequest<int>
    {
        public string Content { get; set; } = string.Empty;

        public int VideoId { get; set; }
    }
}
