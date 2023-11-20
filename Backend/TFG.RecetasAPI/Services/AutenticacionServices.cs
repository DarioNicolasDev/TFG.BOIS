using Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Models.ApiModels;
using Models.Autenticacion;
using Models.Usuario;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Sockets;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class AutenticacionServices
    {
        private readonly AppDBContext _context;
        private readonly Secret _secret;

        public AutenticacionServices(AppDBContext context, IOptions<Secret> secretOptions)
        {
            _context = context;
            _secret = secretOptions.Value;
        }

        public async Task<ApiResponse<Autentincacion>> Autenticar(Usuario usuario)
        {
            ApiResponse<Autentincacion> response = new ApiResponse<Autentincacion>();
            Autentincacion autentincacion = new Autentincacion();
            Usuario usuarioAutenticado = await _context.Usuario
                                                            .Include(p => p.UsuarioPreferencias)
                                                                .ThenInclude(p => p.Preferencia)
                                                            .SingleOrDefaultAsync(x => 
                                                                                        x.Email == usuario.Email 
                                                                                        && 
                                                                                        x.Password == usuario.Password
                                                                                        &&
                                                                                        x.Habilitado);
            if (usuarioAutenticado == null)
            {
                response.StatusCode = 200;
                response.Detail = "Usuario no autenticado";
                response.Data = null;
            }
            else
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                autentincacion.Usuario = usuarioAutenticado;
                autentincacion.Usuario.Password = string.Empty;
                SecurityToken token = await GenerarTokenAsync(usuarioAutenticado);
                autentincacion.Token = tokenHandler.WriteToken(token);
                autentincacion.TokenExpiration = token.ValidTo;

                response.Data.Add(autentincacion);
                response.StatusCode = 200;
                response.Detail = "Usuario autenticado correctamente";
            }
            return response;
        }

        public async Task<ApiResponse<Autentincacion>> Registrar(Usuario usuario)
        {
            ApiResponse<Autentincacion> response = new ApiResponse<Autentincacion>();
            await _context.Usuario.AddAsync(usuario);
            var respuestaSQL = await _context.SaveChangesAsync();
            if (respuestaSQL > 0)
            {
                response = await Autenticar(usuario);
                response.StatusCode = 201;
            }
            else
            {
                response.Data = null;
                response.StatusCode = 200;
                response.Detail = "No se ha podido registrar el usuario";
            }
            return response;
        }

        private async Task<SecurityToken> GenerarTokenAsync(Usuario usuario)
        {
            return await Task.Run(() => {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_secret.Value);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("ID", usuario.ID.ToString()) }),
                    Expires = DateTime.UtcNow.AddMinutes(30),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return token;
            });
        }
    }
}
