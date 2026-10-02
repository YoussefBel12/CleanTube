using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Application.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace CleanTube.Infrastructure.Services
{
    public class VideoFileStorage : IVideoFileStorage
    {
        private readonly IWebHostEnvironment _environment;

        public VideoFileStorage(IWebHostEnvironment environment)
        {
            _environment = environment;
        }

        public async Task<(string VideoUrl, string ThumbnailUrl)> SaveAsync(
            IFormFile videoFile,
            IFormFile thumbnailFile,
            CancellationToken cancellationToken)
        {
            var videosFolder = Path.Combine(
                _environment.WebRootPath,
                "uploads",
                "videos");

            var thumbnailsFolder = Path.Combine(
                _environment.WebRootPath,
                "uploads",
                "thumbnails");

            Directory.CreateDirectory(videosFolder);
            Directory.CreateDirectory(thumbnailsFolder);

            var videoExtension =
                Path.GetExtension(videoFile.FileName).ToLowerInvariant();

            var thumbnailExtension =
                Path.GetExtension(thumbnailFile.FileName).ToLowerInvariant();

            var videoFileName =
                $"{Guid.NewGuid()}{videoExtension}";

            var thumbnailFileName =
                $"{Guid.NewGuid()}{thumbnailExtension}";

            var videoPath = Path.Combine(
                videosFolder,
                videoFileName);

            var thumbnailPath = Path.Combine(
                thumbnailsFolder,
                thumbnailFileName);

            await using (var videoStream = new FileStream(
                videoPath,
                FileMode.Create))
            {
                await videoFile.CopyToAsync(
                    videoStream,
                    cancellationToken);
            }

            await using (var thumbnailStream = new FileStream(
                thumbnailPath,
                FileMode.Create))
            {
                await thumbnailFile.CopyToAsync(
                    thumbnailStream,
                    cancellationToken);
            }

            var videoUrl =
                $"/uploads/videos/{videoFileName}";

            var thumbnailUrl =
                $"/uploads/thumbnails/{thumbnailFileName}";

            return (videoUrl, thumbnailUrl);
        }
    }
}
