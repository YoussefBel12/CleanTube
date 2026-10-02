
namespace CleanTube.Application.Dtos.Videos
{

    public class VideoDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string VideoUrl { get; set; } = string.Empty;

        public string ThumbnailUrl { get; set; } = string.Empty;

        public DateTime UploadedAt { get; set; }

        public int ChannelId { get; set; }

        public string ChannelName { get; set; } = string.Empty;
    }
}
