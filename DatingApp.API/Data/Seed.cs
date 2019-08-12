using System.Collections.Generic;
using datingapp.api.Data;
using DatingApp.API.Models;
using Newtonsoft.Json;

namespace DatingApp.API.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
        _context = context;
        }

        public void SeedUsers(){
            var userData=System.IO.File.ReadAllText("Data/UserJsonData.json");
             var users=JsonConvert.DeserializeObject<List<User>>(userData);
            foreach (var user in users)
            {
                byte[] paswordSalt,paswordHash;
                CreatePasswordHash("password",out paswordHash,out paswordSalt);
                user.PasswordHash=paswordHash;
                user.PasswordSalt=paswordSalt;
                user.UserName=user.UserName.ToLower();
                _context.Users.Add(user);
                                
            }
            _context.SaveChanges();

        }
         private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512()){
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                passwordSalt=hmac.Key;
            }
        
        }
    }
}