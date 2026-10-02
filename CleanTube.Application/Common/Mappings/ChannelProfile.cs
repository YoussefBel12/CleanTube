using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using CleanTube.Application.Dtos.Channels;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Common.Mappings
{
    public class ChannelProfile : Profile
    {
        public ChannelProfile()
        {
            CreateMap<Channel, ChannelDto>();
        }
    }
}
