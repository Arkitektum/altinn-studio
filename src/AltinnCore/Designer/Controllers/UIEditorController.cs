using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using AltinnCore.Common.Configuration;
using AltinnCore.Common.Helpers;
using AltinnCore.Common.Services.Interfaces;
using AltinnCore.ServiceLibrary.Configuration;
using AltinnCore.ServiceLibrary.ServiceMetadata;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace AltinnCore.Designer.Controllers
{
    /// <summary>
    /// Controller containing all react-ions
    /// </summary>
    [Authorize]
    public class UIEditorController : Controller
    {
        private readonly IRepository _repository;
        private readonly ServiceRepositorySettings _repoSettings;

        /// <summary>
        /// Initializes a new instance of the <see cref="UIEditorController"/> class.
        /// </summary>
        /// <param name="repositoryService">The application repository service</param>
        /// <param name="settings">The application repository settings.</param>
        public UIEditorController(
            IRepository repositoryService,
            IOptions<ServiceRepositorySettings> settings)
        {
            _repository = repositoryService;
            _repoSettings = settings.Value;
        }

        /// <summary>
        /// The index action which will show the React form builder
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>A view with the React form builder</returns>
        public IActionResult Index(string org, string app)
        {
            return RedirectToAction("Index", "ServiceDevelopment");
        }

        /// <summary>
        /// Get form layout as JSON
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model representation as JSON</returns>
        [HttpGet]
        public ActionResult GetFormLayout(string org, string app)
        {
            return Content(_repository.GetJsonFormLayout(org, app), "text/plain", Encoding.UTF8);
        }

        /// <summary>
        /// Get third party components listed as JSON
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model representation as JSON</returns>
        [HttpGet]
        public ActionResult GetThirdPartyComponents(string org, string app)
        {
            return Content(_repository.GetJsonThirdPartyComponents(org, app), "text/plain", Encoding.UTF8);
        }

        /// <summary>
        /// Get rule handler in JSON structure
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>The model representation as JSON</returns>
        [HttpGet]
        public ActionResult GetRuleHandler(string org, string app)
        {
            return Content(_repository.GetRuleHandler(org, app), "application/javascript", Encoding.UTF8);
        }

        /// <summary>
        /// Get text resource as JSON for specified language
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <param name="id">The language id for the text resource file</param>
        /// <returns>The model representation as JSON</returns>
        [HttpGet]
        public ActionResult GetTextResources(string org, string app, string id)
        {
            var result = _repository.GetLanguageResource(org, app, id);
            return Content(result);
        }

        /// <summary>
        /// Save form layout as JSON
        /// </summary>
        /// <param name="jsonData">The code list data to save</param>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>A success message if the save was successful</returns>
        [HttpPost]
        public ActionResult SaveFormLayout([FromBody] dynamic jsonData, string org, string app)
        {
            _repository.SaveJsonFormLayout(org, app, jsonData.ToString());

            return Json(new
            {
                Success = true,
                Message = "Skjema lagret",
            });
        }

        /// <summary>
        /// Save form layout as JSON
        /// </summary>
        /// <param name="jsonData">The code list data to save</param>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns>A success message if the save was successful</returns>
        [HttpPost]
        public ActionResult SaveThirdPartyComponents([FromBody] dynamic jsonData, string org, string app)
        {
            _repository.SaveJsonThirdPartyComponents(org, app, jsonData.ToString());

            return Json(new
            {
                Success = true,
                Message = "Tredjeparts komponenter lagret",
            });
        }

        /// <summary>
        /// Save JSON data as file
        /// </summary>
        /// <param name="jsonData">The code list data to save</param>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <param name="fileName">The filename to be saved as</param>
        /// <returns>A success message if the save was successful</returns>
        [HttpPost]
        public ActionResult SaveJsonFile([FromBody] dynamic jsonData, string org, string app, string fileName)
        {
            if (!ApplicationHelper.IsValidFilename(fileName))
            {
                return BadRequest();
            }

            if (fileName.Equals(_repoSettings.GetRuleConfigFileName()))
            {
                _repository.SaveRuleConfigJson(org, app, jsonData.ToString());
            }
            else
            {
                _repository.SaveJsonFile(org, app, jsonData.ToString(), fileName);
            }

            return Json(new
            {
                Success = true,
                Message = fileName + " saved",
            });
        }

        /// <summary>
        /// Get JSON file in JSON structure
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <param name="fileName">The filename to read from</param>
        /// <returns>The model representation as JSON</returns>
        [HttpGet]
        public ActionResult GetJsonFile(string org, string app, string fileName)
        {
            if (!ApplicationHelper.IsValidFilename(fileName))
            {
                return BadRequest();
            }

            return Content(_repository.GetJsonFile(org, app, fileName), "application/javascript", Encoding.UTF8);
        }

        /// <summary>
        /// Adds the metadata for attachment
        /// </summary>
        /// <param name="applicationMetadata">the application meta data to be updated</param>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult AddMetadataForAttachment([FromBody] dynamic applicationMetadata, string org, string app)
        {
            _repository.AddMetadataForAttachment(org, app, applicationMetadata.ToString());
            return Json(new
            {
                Success = true,
                Message = " Metadata saved",
            });
        }

        /// <summary>
        /// Updates the metadata for attachment
        /// </summary>
        /// <param name="applicationMetadata">the application meta data to be updated</param>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult UpdateMetadataForAttachment([FromBody] dynamic applicationMetadata, string org, string app)
        {
            _repository.UpdateMetadataForAttachment(org, app, applicationMetadata.ToString());
            return Json(new
            {
                Success = true,
                Message = " Metadata saved",
            });
        }

        /// <summary>
        /// Deletes the metadata for attachment
        /// </summary>
        /// <param name="org">Unique identifier of the organisation responsible for the app.</param>
        /// <param name="app">Application identifier which is unique within an organisation.</param>
        /// <param name="id">the id of the component</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult DeleteMetadataForAttachment(string org, string app, string id)
        {
            _repository.DeleteMetadataForAttachment(org, app, id);
            return Json(new
            {
                Success = true,
                Message = " Metadata saved",
            });
        }
    }
}
