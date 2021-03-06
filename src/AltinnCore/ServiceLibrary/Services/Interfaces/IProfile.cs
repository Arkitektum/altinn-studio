using System.Threading.Tasks;
using AltinnCore.ServiceLibrary.Models;

namespace AltinnCore.ServiceLibrary.Services.Interfaces
{
    /// <summary>
    /// Interface for profile functionality
    /// </summary>
    public interface IProfile
    {
        /// <summary>
        /// Method for getting the userprofile from a given user id
        /// </summary>
        /// <param name="userId">the user id</param>
        /// <returns>The userprofile for the given user id</returns>
        Task<UserProfile> GetUserProfile(int userId);
    }
}
