using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Dtos.Comments;
using MediatR;

namespace CleanTube.Application.Features.Comments.Queries
{
    public class GetCommentsByVideoQuery
    : IRequest<IEnumerable<CommentDto>>
    {
        public int VideoId { get; set; }
    }
}
