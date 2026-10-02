using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Likes.Queries
{
    public class GetLikeCountQueryValidator
    : AbstractValidator<GetLikeCountQuery>
    {
        public GetLikeCountQueryValidator()
        {
            RuleFor(x => x.VideoId)
                .GreaterThan(0);
        }
    }
}
