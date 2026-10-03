using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Dtos.Videos;
using MediatR;

namespace CleanTube.Application.Features.Videos.Queries
{
    public class SearchVideosQuery : IRequest<IEnumerable<VideoDto>> 
    {
        public string Query { get; set; } = string.Empty;

    }
}
