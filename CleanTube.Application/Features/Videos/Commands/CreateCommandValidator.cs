using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
