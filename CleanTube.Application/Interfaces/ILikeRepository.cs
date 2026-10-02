using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Interfaces
{
    public interface ILikeRepository
    {
        Task<Like?> GetByIdAsync(int id);

        Task<Like?> GetByUserAndVideoAsync(
            string userId,
            int videoId);

        Task<int> GetLikeCountAsync(int videoId);

        Task AddAsync(Like like);

        void Delete(Like like);
    }
}
