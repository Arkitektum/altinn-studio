using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Altinn.Platform.Authorization.Configuration
{
    /// <summary>
    /// General configuration settings
    /// </summary>
    public class GeneralSettings
    {
        /// <summary>
        /// Gets or sets the bridge api endpoint
        /// </summary>
        public string BridgeApiEndpoint { get; set; }

        /// <summary>
        /// Gets the bridge api endpoint from kubernetes environment variables and appsettings if environment variable is not set
        /// </summary>
        public string GetBridgeApiEndpoint
        {
            get
            {
                return Environment.GetEnvironmentVariable("GeneralSettings__BridgeApiEndpoint") ?? BridgeApiEndpoint;
            }
        }

        /// <summary>
        /// Gets or sets the SBL base adress
        /// </summary>
        public string SBLBaseAdress { get; set; }

        /// <summary>
        /// Gets the SBL base adress from kubernetes environment variables and appsettings if environment variable is not set
        /// </summary>
        public string GetSBLBaseAdress
        {
            get
            {
                return Environment.GetEnvironmentVariable("GeneralSettings__SBLBaseAdress") ?? SBLBaseAdress;
            }
        }
    }
}
