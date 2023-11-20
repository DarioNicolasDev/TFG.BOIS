using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.ApiModels;
using Models.Ingrediente;
using Services;
using TFG.RecetasAPI.Autenticacion;

namespace TFG.RecetasAPI.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class IngredienteController : ControllerBase
    {
        private readonly IngredientesServices _ingredientesServices;

        public IngredienteController(IngredientesServices ingredientesServices)
        {
                _ingredientesServices = ingredientesServices;
        }

        [CustomAuthorize]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<ApiResponseIngredientesTipos>>> GetAll()
        {
            ApiResponse<ApiResponseIngredientesTipos> response = await _ingredientesServices.GetAll();
            return StatusCode(response.StatusCode,response);
        }
    }
}
