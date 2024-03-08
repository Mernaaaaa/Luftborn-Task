using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tasks.DTOs;
using Tasks.Models;

namespace Tasks.Mappings
{
    public class TaskMappingProfile : Profile
    {
        public TaskMappingProfile()
        {
            CreateMap<TaskAddDTO, TaskModel>()
                .ForMember(dest => dest.ID, opt => opt.Ignore()) 
                .ForMember(dest => dest.Created, opt => opt.MapFrom(src => DateTime.Now));

            CreateMap<TaskModel, TaskAllDTO>()
           .ForMember(dest => dest.Created, opt => opt.MapFrom(src => src.Created.ToString("yyyy-MM-dd HH:mm:ss")));

            CreateMap<TaskEditDTO, TaskModel>();

        }
    }
}
