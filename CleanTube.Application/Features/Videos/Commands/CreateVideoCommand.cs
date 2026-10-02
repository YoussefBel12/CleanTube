/*
using MediatR;

namespace CleanTube.Application.Features.Videos.Commands
{
    public class CreateVideoCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string VideoUrl { get; set; } = string.Empty;

        public string ThumbnailUrl { get; set; } = string.Empty;

        public int ChannelId { get; set; }
    }
}
*/


using MediatR;
using Microsoft.AspNetCore.Http;

namespace CleanTube.Application.Features.Videos.Commands
{

    public class CreateVideoCommand : IRequest<int>
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public IFormFile? VideoFile { get; set; }

        public IFormFile? ThumbnailFile { get; set; }

       // public int ChannelId { get; set; }
    }

}