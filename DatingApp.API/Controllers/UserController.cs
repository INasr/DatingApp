using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IDatingRepository _rep;
        private readonly IMapper _mapper;
        public UserController(IDatingRepository rep, IMapper mapper)
        {
            _mapper = mapper;
            _rep = rep;

        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _rep.GetUsers();
            var usersToReturn= _mapper.Map<IEnumerable<UserForListDto>>(users);
            return Ok(usersToReturn);
        }

        [HttpGet("{Id}",Name="GetUser")]
        public async Task<IActionResult> GetUser(int Id)
        {
            var user = await _rep.GetUser(Id);
            var userToReturn= _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToReturn);
        }
        
        [HttpPut("{Id}")]
        public async Task<IActionResult> UpdateUser(int id,UserForUpdateDto userForUpdateDto){
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var userFromRopo= await _rep.GetUser(id);
             _mapper.Map(userForUpdateDto, userFromRopo);
             if(await _rep.SaveAll())
             return NoContent();

             throw new Exception("error");

        }
    }
}