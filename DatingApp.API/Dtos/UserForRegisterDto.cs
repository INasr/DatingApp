using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName{ get; set; }
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="Password should be more than or equal 4 chars")]
        public string Password  { get; set; }   
    }
}