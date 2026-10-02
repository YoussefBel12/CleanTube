/*
using FluentValidation;

namespace CleanTube.Application.Features.Videos.Commands
{
    public class CreateVideoCommandValidator
     : AbstractValidator<CreateVideoCommand>
    {
        public CreateVideoCommandValidator()
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .MaximumLength(200);

            RuleFor(x => x.Description)
                .MaximumLength(5000);

            RuleFor(x => x.VideoUrl)
                .NotEmpty();

            RuleFor(x => x.ThumbnailUrl)
                .NotEmpty();

            RuleFor(x => x.ChannelId)
                .GreaterThan(0);
        }
    }
}
*/




using FluentValidation;

namespace CleanTube.Application.Features.Videos.Commands
{
public class CreateVideoCommandValidator
    : AbstractValidator<CreateVideoCommand>
{
    private static readonly string[] AllowedVideoExtensions =
    {
        ".mp4",
        ".webm",
        ".mov"
    };

    private static readonly string[] AllowedThumbnailExtensions =
    {
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    };

    private const long MaxVideoSize = 500 * 1024 * 1024; // 500 MB
    private const long MaxThumbnailSize = 5 * 1024 * 1024; // 5 MB

    public CreateVideoCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .MaximumLength(5000);

        RuleFor(x => x.ChannelId)
            .GreaterThan(0);

        RuleFor(x => x.VideoFile)
            .NotNull()
            .WithMessage("Video file is required.");

        RuleFor(x => x.VideoFile)
            .Must(file =>
                file is not null &&
                AllowedVideoExtensions.Contains(
                    Path.GetExtension(file.FileName).ToLowerInvariant()))
            .When(x => x.VideoFile is not null)
            .WithMessage("Only MP4, WebM, and MOV video files are allowed.");

        RuleFor(x => x.VideoFile)
            .Must(file =>
                file is not null &&
                file.Length > 0 &&
                file.Length <= MaxVideoSize)
            .When(x => x.VideoFile is not null)
            .WithMessage("Video file must be greater than 0 and no larger than 500 MB.");

        RuleFor(x => x.ThumbnailFile)
            .NotNull()
            .WithMessage("Thumbnail is required.");

        RuleFor(x => x.ThumbnailFile)
            .Must(file =>
                file is not null &&
                AllowedThumbnailExtensions.Contains(
                    Path.GetExtension(file.FileName).ToLowerInvariant()))
            .When(x => x.ThumbnailFile is not null)
            .WithMessage("Only JPG, JPEG, PNG, and WebP thumbnail files are allowed.");

        RuleFor(x => x.ThumbnailFile)
            .Must(file =>
                file is not null &&
                file.Length > 0 &&
                file.Length <= MaxThumbnailSize)
            .When(x => x.ThumbnailFile is not null)
            .WithMessage("Thumbnail must be greater than 0 and no larger than 5 MB.");
    }
}
}
