using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Altinn.Authorization.ABAC.Xacml.JsonProfile;
using Altinn.Common.PEP.Interfaces;
using Newtonsoft.Json;

namespace Altinn.Platform.Storage.IntegrationTest.Mocks
{
    public class PDPMock : IPDP
    {
        public Task<XacmlJsonResponse> GetDecisionForRequest(XacmlJsonRequestRoot xacmlJsonRequest)
        {
            string jsonResponse;

            if (xacmlJsonRequest.Request.AccessSubject[0].Attribute.Exists(a => (a.AttributeId == "urn:altinn:userid" && a.Value == "1")))
            {
                jsonResponse = File.ReadAllText("C:/Repos/altinn-studio/src/Altinn.Platform/Altinn.Platform.Storage/IntegrationTest/data/response_permit.json");
            }
            else
            {
                jsonResponse = File.ReadAllText("C:/Repos/altinn-studio/src/Altinn.Platform/Altinn.Platform.Storage/IntegrationTest/data/response_deny.json");
            }

            XacmlJsonResponse response = JsonConvert.DeserializeObject<XacmlJsonResponse>(jsonResponse);

            return Task.FromResult(response);
        }

        public Task<bool> GetDecisionForUnvalidateRequest(XacmlJsonRequestRoot xacmlJsonRequest, ClaimsPrincipal user)
        {
            return Task.FromResult(true);
        }
    }
}
