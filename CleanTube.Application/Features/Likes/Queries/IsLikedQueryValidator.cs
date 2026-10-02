using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FluentValidation;

namespace CleanTube.Application.Features.Likes.Queries
{
    public class IsLikedQueryValidator
     : AbstractValidator<IsLikedQuery>
    {
        public IsLikedQueryValidator()
        {
            RuleFor(x => x.VideoId)
                .GreaterThan(0);
        }
    }
}
