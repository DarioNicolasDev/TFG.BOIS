using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models.Autenticacion;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Secret _secret;

        public JwtMiddleware(RequestDelegate next, IOptions<Secret> secret)
        {
            _next = next;
            _secret = secret.Value;
        }

        public async Task Invoke(HttpContext context, AutenticacionServices autenticacionServices)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();
            if (token != null)
                attachUserToContext(context, autenticacionServices, token);

            await _next(context);
        }

        private async Task attachUserToContext(HttpContext context, AutenticacionServices usuariosServices, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secret.Value);
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "ID").Value);

                // Si se autentica correctamente se adjunta el usuario correspondiente al contexto HTTP
                //Usuario usuario = await  usuariosServices.GetUsuario(userId);
                context.Items["Usuario"] = userId;
            }
            catch (Exception ex)
            {
                // Autenticación fallida
                // El usuario no tiene permisos
            }
        }
    }
}
