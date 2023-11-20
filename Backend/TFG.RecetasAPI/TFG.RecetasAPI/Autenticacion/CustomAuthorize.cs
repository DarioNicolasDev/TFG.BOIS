using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TFG.RecetasAPI.Autenticacion
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomAuthorize : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = (int?)context.HttpContext.Items["Usuario"];
            if (user == null)
            {
                // not logged in
                context.Result = new JsonResult(new { message = "Sin autorización" }) { StatusCode = StatusCodes.Status401Unauthorized };
            }
        }
    }
}
