using Data;
using Microsoft.EntityFrameworkCore;
using Models.ApiModels;
using Models.Ingrediente;
using Models.Receta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Services
{
    public class IngredientesServices
    {
        private readonly AppDBContext _context;
        public IngredientesServices(AppDBContext context)
        {
            _context = context;
        }

        public async Task<ApiResponse<ApiResponseIngredientesTipos>> GetAll()
        {
            ApiResponse<ApiResponseIngredientesTipos> response = new ApiResponse<ApiResponseIngredientesTipos>();          

            try
            {
                List<Ingrediente> ingredientes = await _context.Ingrediente.Include(x => x.TipoIngrediente).ToListAsync();
                List<TipoIngrediente> tiposIngrediente = await _context.TipoIngrediente.ToListAsync();
                ApiResponseIngredientesTipos apiResponseIngredientesTipos = new ApiResponseIngredientesTipos();
                
                apiResponseIngredientesTipos.Ingredientes = ingredientes.OrderBy(y => y.NombreIngrediente).ToList();
                apiResponseIngredientesTipos.TiposIngrediente = tiposIngrediente.Where(x => ingredientes.Any(y => y.TipoIngredienteID == x.ID) ).OrderBy(y => y.NombreTipoIngrediente).ToList();
                response.Data.Add(apiResponseIngredientesTipos);
                if (ingredientes.Count > 0)
                {                    
                    response.StatusCode = 200;
                    response.Detail = "Ingredientes obtenidos correctamente";
                }
                else
                {                  
                    response.StatusCode = 404;
                    response.Detail = "No hay ingredientes en la base de datos";
                }
            }
            catch(Exception ex)
            {
                response.Data = null;
                response.StatusCode = 500;
                response.Detail = ex.Message;
            }
           

            return response;
        }
    }

}
