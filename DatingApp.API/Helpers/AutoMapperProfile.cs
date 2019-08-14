using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User,UserForListDto>()
            .ForMember(dest=>dest.PhotoUrl,opt=>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
            }).ForMember(d => d.Age, map => map.MapFrom((s,d) => s.DateOfBirth.CalculateAge()));
            CreateMap<User,UserForDetailedDto>() .ForMember(dest=>dest.PhotoUrl,opt=>{
                opt.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain).Url);
            }).ForMember(d => d.Age, map => map.MapFrom((s,d) => s.DateOfBirth.CalculateAge()));
            CreateMap<Photo,PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<Photo,PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UserForRegisterDto,User>();
        }
    }
}