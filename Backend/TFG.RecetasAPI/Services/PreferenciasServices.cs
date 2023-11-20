using Azure;
using Data;
using Microsoft.EntityFrameworkCore;
using Models.ApiModels;
using Models.Preferencia;
using Models.Usuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class PreferenciasServices
    {
        private readonly AppDBContext _context;

        public PreferenciasServices(AppDBContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<Preferencia>> GetAllPreferencias()
        {
            ApiResponse<Preferencia> response = new ApiResponse<Preferencia>();
            response.StatusCode = 200;
            List<Preferencia> preferencias = await _context.Preferencia.Include(p => p.TipoPreferencia).ToListAsync();
            if (preferencias != null && preferencias.Count > 0)
            {
                response.Data = preferencias;
                response.Detail = "Preferencias obtenidas correctamente";
            }
            else
            {
                response.Data = null;
                response.Detail = "No se han obtenido preferencias";
            }


            return response;
        }

        public async Task<ApiResponse<UsuarioPreferencia>> GuardarUsuarioPereferncias(List<UsuarioPreferencia> usuarioPreferencias)
        {
            ApiResponse<UsuarioPreferencia> response = new ApiResponse<UsuarioPreferencia>();
            response.StatusCode = 200;
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                await EliminarUsuarioPreferencias(usuarioPreferencias.First().UsuarioID);

                await _context.UsuarioPreferencia.AddRangeAsync(usuarioPreferencias);
                if(await _context.SaveChangesAsync() > 0)
                {
                    await transaction.CommitAsync();
                    response.Data = await _context.UsuarioPreferencia
                                                         .Include(x => x.Preferencia)
                                                         .Where(x => x.UsuarioID == usuarioPreferencias.First().UsuarioID)
                                                         .ToListAsync();

                    response.Detail = "Preferencias guardadas correctamente";
                }
                else
                {
                    response.Data = null;
                    response.Detail = "Las preferencias no se pudieron guardar";
                    await transaction.RollbackAsync();
                }
            }
            catch (Exception ex)
            {
                response.Data = null;
                response.Detail = $"Las preferencias no se pudieron guardar: {ex.Message}";
                await transaction.RollbackAsync();                

            }


            return response;
        }

        public async Task<ApiResponse<UsuarioPreferencia>> EliminarUsuarioPreferencias(int usuarioId)
        {
            ApiResponse<UsuarioPreferencia> response = new ApiResponse<UsuarioPreferencia>();
            response.StatusCode = 200;
            var usuarioPreferenciasEliminar = await _context.UsuarioPreferencia
                    .Where(x => x.UsuarioID == usuarioId)
                    .ToListAsync();

            if (usuarioPreferenciasEliminar.Any())
            {
                _context.UsuarioPreferencia.RemoveRange(usuarioPreferenciasEliminar);
                if(await _context.SaveChangesAsync() > 0)
                {
                    response.Detail = "Se eliminaron correctamente las preferencias del usuario";
                    response.Data = new List<UsuarioPreferencia>();
                }
                else
                {
                    response.Detail = "No se pudieron eliminar las preferencias del usuario";
                    response.Data = new List<UsuarioPreferencia>();
                }
            }
            else
            {
                response.Detail = "No se pudieron eliminar las preferencias del usuario";
                response.Data = new List<UsuarioPreferencia>();
            }

            return response;
        }

    }
}
