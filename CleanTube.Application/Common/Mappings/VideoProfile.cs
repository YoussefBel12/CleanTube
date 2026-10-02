using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Videos;
using CleanTube.Domain.Entities;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CleanTube.Application.Common.Mappings
{
    public class VideoProfile : Profile
    {
        public VideoProfile()
        {
            CreateMap<Video, VideoDto>()
                .ForMember(
                dest => dest.ChannelName,
                opt => opt.MapFrom(src => src.Channel.Name)


                );
        }
    }
}

