using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Models.ApiModels;
using Models.Ingrediente;
using Models.Preferencia;
using Models.Receta;
using Services;
using TFG.RecetasAPI.Autenticacion;
using TFG.RecetasAPI.Hubs;

namespace TFG.RecetasAPI.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class RecetaController : ControllerBase
    {
        private readonly RecetasServices _recetasServices;
        private readonly IHubContext<NotificacionHub> _hubContext;

        public RecetaController(RecetasServices recetasServices, IHubContext<NotificacionHub> hubContext)
        {
            _recetasServices = recetasServices;
            _hubContext = hubContext;
        }

        [CustomAuthorize]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<Receta>>> GetRecetasByIngredientes(List<int> listaIngredientesID)
        {
            ApiResponse<Receta> response = await _recetasServices.GetRecetasByIngredientes(listaIngredientesID);

            return StatusCode(response.StatusCode, response);
        }

        [CustomAuthorize]
        [HttpPost("/RecetaIA")]
        public async Task<ActionResult<Receta>> GenerateRecetaFromOpenAI(ApiGetReceta apiGetReceta)
        {
            ApiResponse<Receta> response = await _recetasServices.GenerateRecetaFromOpenAI(apiGetReceta.Ingredientes, apiGetReceta.Preferencias);

            return StatusCode(response.StatusCode, response);
        }

        [CustomAuthorize]
        [HttpPost("/Receta")]
        public async Task<ActionResult<Receta>> GetRecetasByIngredientes(ApiGetReceta apiGetReceta)
        {
            ApiResponse<Receta> response = await _recetasServices.GetRecetasByIngredientes(apiGetReceta.Ingredientes, apiGetReceta.Preferencias);

            return StatusCode(response.StatusCode, response);
        }

        [CustomAuthorize]
        [HttpPost("/NuevaReceta")]
        public async Task<ActionResult<Receta>> GetRecetasByIngredientes(Receta receta)
        {
            ApiResponse<Receta> response = await _recetasServices.CreateReceta(receta);

            return StatusCode(response.StatusCode, response);
        }

        [HttpGet]
        public async Task<ActionResult> Prueba(string mensaje)
        {
            _hubContext.Clients.All.SendAsync("RecibirMensaje","Hola", mensaje);
            return Ok(mensaje);
        }


    }
}
