using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.ApiModels;
using Models.Autenticacion;
using Models.Usuario;
using Services;

namespace TFG.RecetasAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutenticacionController : ControllerBase
    {
        private readonly AutenticacionServices _autenticacionServices;

        public AutenticacionController(AutenticacionServices autenticacionServices)
        {
                _autenticacionServices = autenticacionServices;
        }


        [HttpPost]
        public async Task<ActionResult<ApiResponse<Autentincacion>>> Autentincar(Usuario usuario)
        {
            ApiResponse<Autentincacion> response = await _autenticacionServices.Autenticar(usuario);
            return StatusCode(response.StatusCode, response);           
        }

        [HttpPost("registro")]
        public async Task<ActionResult<ApiResponse<Autentincacion>>> Registrar(Usuario usuario)
        {
            ApiResponse<Autentincacion> response = await _autenticacionServices.Registrar(usuario);
            return StatusCode(response.StatusCode, response);
        }
    }
}
