using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanTube.Domain.Entities;

namespace CleanTube.Application.Interfaces
{
    public interface IChannelRepository
    {
        Task<Channel?> GetByIdAsync(int id);

        Task<IEnumerable<Channel>> GetAllAsync();

        Task<IEnumerable<Channel>> GetByOwnerIdAsync(
            string ownerId);

        Task AddAsync(Channel channel);

        void Update(Channel channel);

        void Delete(Channel channel);
    }
}
