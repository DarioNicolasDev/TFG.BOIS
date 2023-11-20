using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.ApiModels;
using Models.Preferencia;
using Models.Usuario;
using Services;
using TFG.RecetasAPI.Autenticacion;

namespace TFG.RecetasAPI.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    public class PreferenciaController : ControllerBase
    {

        private readonly PreferenciasServices _preferenciasServices;

        public PreferenciaController(PreferenciasServices preferenciasServices)
        {
            _preferenciasServices = preferenciasServices;
        }

        [CustomAuthorize]
        [HttpGet]
        public async Task<ActionResult<ApiResponse<Preferencia>>> GetAllPreferencias()
        {
            ApiResponse<Preferencia> response = await _preferenciasServices.GetAllPreferencias();

            return StatusCode(response.StatusCode, response);
        }

        [CustomAuthorize]
        [HttpPost]
        public async Task<ActionResult<ApiResponse<UsuarioPreferencia>>> GuardarPreferenciasUsuario(List<UsuarioPreferencia> usuarioPreferencias )
        {
            ApiResponse<UsuarioPreferencia> response = await _preferenciasServices.GuardarUsuarioPereferncias(usuarioPreferencias);

            return StatusCode(response.StatusCode, response);
        }

        [CustomAuthorize]
        [HttpDelete("{usuarioId}")]
        public async Task<ActionResult<ApiResponse<UsuarioPreferencia>>> EliminarUsuarioPreferencia(int usuarioId)
        {
            ApiResponse<UsuarioPreferencia> response = await _preferenciasServices.EliminarUsuarioPreferencias(usuarioId);
            return StatusCode(response.StatusCode, response);
        }

    }
}
