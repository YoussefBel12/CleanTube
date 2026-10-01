using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Dtos.Videos;
using MediatR;

namespace CleanTube.Application.Features.Videos.Queries
{
    public class GetVideoByIdQuery : IRequest<VideoDto?>
    {
        public int Id { get; set; }
    }
}
