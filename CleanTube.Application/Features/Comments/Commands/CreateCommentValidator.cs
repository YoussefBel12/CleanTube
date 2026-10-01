using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Comments.Commands
{
    public class CreateCommentCommandValidator
    : AbstractValidator<CreateCommentCommand>
    {
        public CreateCommentCommandValidator()
        {
            RuleFor(x => x.Content)
                .NotEmpty()
                .MaximumLength(1000);

            RuleFor(x => x.VideoId)
                .GreaterThan(0);
        }
    }
}
