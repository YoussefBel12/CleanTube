using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace CleanTube.Application.Interfaces
{
    public interface IVideoFileStorage
    {
        Task<(string VideoUrl, string ThumbnailUrl)> SaveAsync(
            IFormFile videoFile,
            IFormFile thumbnailFile,
            CancellationToken cancellationToken);
    }
}
