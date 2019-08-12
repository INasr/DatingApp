using System.Collections.Generic;
using System.Threading.Tasks;
using datingapp.api.Data;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context= context;

        }
       

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(User entity) where T : class
        {
            _context.Remove(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            throw new System.NotImplementedException();
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
           return await _context.Photos.FirstOrDefaultAsync(u=>u.UserId==userId);
        }

        public async Task<Photo> GetPhoto(int id)
        {
           return await _context.Photos.FirstOrDefaultAsync(e=>e.Id==id);
        }

        public async Task<User> GetUser(int Id)
        {
           return await _context.Users.Include(p=>p.Photos).FirstAsync(e=>e.Id==Id);
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
           return await _context.Users.Include(p=>p.Photos).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync()>0;
        }
    }
}