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
            string jsonResponse = string.Empty;

            if (xacmlJsonRequest.Request.MultiRequests.RequestReference.Count > 0)
            {
                jsonResponse = File.ReadAllText("data/response_multi_permit.json");
            }
            else if (xacmlJsonRequest.Request.AccessSubject[0].Attribute.Exists(a => (a.AttributeId == "urn:altinn:userid" && a.Value == "1")) ||
                xacmlJsonRequest.Request.AccessSubject[0].Attribute.Exists(a => a.AttributeId == "urn:altinn:org"))
            {
                jsonResponse = File.ReadAllText("data/response_permit.json");
            }
            else
            {
                jsonResponse = File.ReadAllText("data/response_deny.json");
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