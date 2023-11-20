using Data;
using Microsoft.EntityFrameworkCore;
using Models.ApiModels;
using Models.Ingrediente;
using Models.Preferencia;
using Models.Receta;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace Services
{
    public class RecetasServices
    {
        private readonly AppDBContext _context;
        private readonly OpenIAServices _openIAServices;
        public RecetasServices(AppDBContext context, OpenIAServices openIAServices)
        {
            _context = context;
            _openIAServices = openIAServices;
        }

        public async Task<ApiResponse<Receta>> GetRecetasByIngredientes(List<int> listaIngredientesID)
        {
            ApiResponse<Receta> response = new ApiResponse<Receta>();

            //List<int> listIngredientes = new List<int> { 1, 2, 6 };

            // Primero, obtenemos los pares de RecetaID y IngredienteID que coinciden con los IDs de ingredientes requeridos
            var recetaIngredientes = await _context.RecetaIngrediente
                .Where(ri => listaIngredientesID.Contains(ri.IngredienteID))
                .Select(ri => new { ri.RecetaID, ri.IngredienteID })
                .ToListAsync();

            // Luego, realizamos la agrupación y conteo en memoria
            var recetaIdsConTodosLosIngredientes = recetaIngredientes
                .GroupBy(ri => ri.RecetaID)
                .Where(g => g.Select(ri => ri.IngredienteID).Distinct().Count() == listaIngredientesID.Count)
                .Select(g => g.Key)
                .ToList();

            // Finalmente, cargamos las recetas completas por los IDs obtenidos
            List<Receta> recetas = await _context.Receta
                .Where(r => recetaIdsConTodosLosIngredientes.Contains(r.ID))
                .Include(r => r.RecetaIngredientes)
                    .ThenInclude(ri => ri.Ingrediente)
                        .ThenInclude(i => i.TipoIngrediente)
                .Include(r => r.RecetaPasos)
                .Include(r => r.RecetaPreferencias)
                    .ThenInclude(i => i.Preferencia)
                        .ThenInclude(t => t.TipoPreferencia)
                .ToListAsync();


            response.Data = recetas;
            response.StatusCode = 200;
            if (recetas.Count > 0)
            {
                response.Detail = "Recetas obtenidas correctamente";
            }
            else
            {
                response.Detail = "No hay recetas que tengan los ingredientes especificados";
            }

            return response;
        }

        public async Task<ApiResponse<Receta>> GetRecetasByIngredientes(List<Ingrediente> ingredientes, List<Preferencia> preferencias = null)
        {
            ApiResponse<Receta> response = new ApiResponse<Receta>();

            List<int> listaIngredientesID = ingredientes.Select(x => x.ID).ToList();
            List<int> listaPreferenciasID = new List<int>();
            if (preferencias != null)
            {
                listaPreferenciasID = preferencias.Select(x => x.ID).ToList();
            }

            // Primero, obtenemos los pares de RecetaID y IngredienteID que coinciden con los IDs de ingredientes requeridos
            var recetaIngredientes = await _context.RecetaIngrediente
                .Where(ri => listaIngredientesID.Contains(ri.IngredienteID))
                .Select(ri => new { ri.RecetaID, ri.IngredienteID })
                .ToListAsync();
            // Luego, realizamos la agrupación y conteo en memoria
            var recetaIdsConTodosLosIngredientes = recetaIngredientes
                .GroupBy(ri => ri.RecetaID)
                .Where(g => g.Select(ri => ri.IngredienteID).Distinct().Count() == listaIngredientesID.Count)
                .Select(g => g.Key)
                .ToList();



            //Obtengo las recetas que tengan las preferencias
            var recetaPreferencias = await _context.RecetaPreferencia
                    .Where(rp => listaPreferenciasID.Contains(rp.PreferenciaID))
                    .Select(rp => new { rp.RecetaID, rp.PreferenciaID })
                    .ToListAsync();
            //luego, realizamos la agrupación y conteo en memoria de las preferencias
            var recetaIdsConTodosLasPreferencias = recetaPreferencias
             .GroupBy(rp => rp.RecetaID)
             .Where(g => g.Select(rp => rp.PreferenciaID).Distinct().Count() == listaPreferenciasID.Count)
             .Select(g => g.Key)
             .ToList();


            // Finalmente, cargamos las recetas completas por los IDs obtenidos
            List<Receta> recetas = await _context.Receta
                .Where(r => recetaIdsConTodosLosIngredientes.Contains(r.ID) && (recetaIdsConTodosLasPreferencias.Count >0 ? recetaIdsConTodosLasPreferencias.Contains(r.ID):true))
                .Include(r => r.RecetaIngredientes)
                    .ThenInclude(ri => ri.Ingrediente)
                        .ThenInclude(i => i.TipoIngrediente)
                .Include(r => r.RecetaPasos)
                .Include(r => r.RecetaPreferencias)
                    .ThenInclude(i => i.Preferencia)
                        .ThenInclude(t => t.TipoPreferencia)
                .ToListAsync();


            response.Data = recetas;
            response.StatusCode = 200;
            if (recetas.Count > 0)
            {
                response.Detail = "Recetas obtenidas correctamente";
            }
            else
            {
                response.Detail = $"No encontramos recetas, pero podemos crear una especial para tí.";
            }

            return response;
        }

        public async Task<Receta> GetRecetaByID(int id)
        {
            Receta receta = new Receta();
            receta = await _context.Receta
                                        .Include(r => r.RecetaIngredientes)
                                            .ThenInclude(ri => ri.Ingrediente)
                                                .ThenInclude(i => i.TipoIngrediente)
                                        .Include(r => r.RecetaPasos)
                                        .Include(r => r.RecetaPreferencias)
                                            .ThenInclude(i => i.Preferencia)
                                                .ThenInclude(t => t.TipoPreferencia)
                                        .FirstOrDefaultAsync(receta => receta.ID == id);
            return receta;
        }
        public async Task<ApiResponse<Receta>> GenerateRecetaFromOpenAI(List<Ingrediente> ingredientes, List<Preferencia> preferencias = null)
        {
            ApiResponse<Receta> response = await _openIAServices.InventReceta(ingredientes, preferencias);
            if (response != null && response.StatusCode == 200 && response.Data != null && response.Data.Count > 0)
            {
                response = await CreateReceta(response.Data.FirstOrDefault());
            }

            return response;
        }

        public async Task<ApiResponse<Receta>> CreateReceta(Receta receta)
        {
            ApiResponse<Receta> response = new ApiResponse<Receta>();

            receta = await PrepararRecetaParaInsert(receta);

            await _context.Receta.AddAsync(receta);

            var respuestaSQL = await _context.SaveChangesAsync();
            if (respuestaSQL > 0)
            {
                receta = await GetRecetaByID(receta.ID);
                response.Data.Add(receta);
                response.StatusCode = 201;
                response.Detail = "Receta creada correctamente";
            }
            else
            {
                response.Data = null;
                response.StatusCode = 200;
                response.Detail = "No se pudo crear la receta";
            }
            return response;
        }

        private async Task<Receta> PrepararRecetaParaInsert(Receta receta)
        {
            receta.ID = 0;
            foreach (RecetaPreferencia recetaPreferencia in receta.RecetaPreferencias)
            {
                recetaPreferencia.ID = 0;
                recetaPreferencia.RecetaID = 0;
                recetaPreferencia.Preferencia = null;
            }
            foreach (RecetaIngrediente recetaIngrediente in receta.RecetaIngredientes)
            {
                recetaIngrediente.ID = 0;
                recetaIngrediente.RecetaID = 0;
                Ingrediente aux = _context.Ingrediente.FirstOrDefault(x => x.NombreIngrediente == recetaIngrediente.Ingrediente.NombreIngrediente);
                if (aux != null)
                {
                    recetaIngrediente.IngredienteID = aux.ID;
                    recetaIngrediente.Ingrediente = null;
                }
                else
                {


                    //TipoIngrediente tipoAux = _context.TipoIngrediente.FirstOrDefault(x => x.NombreTipoIngrediente == recetaIngrediente.Ingrediente.TipoIngrediente.NombreTipoIngrediente);
                    //if (tipoAux != null)
                    //{
                    //    recetaIngrediente.Ingrediente.TipoIngredienteID = tipoAux.ID;
                    //    recetaIngrediente.Ingrediente.TipoIngrediente = null;
                    //}
                    //else
                    //{

                    //    recetaIngrediente.Ingrediente.TipoIngredienteID = 0;
                    //    recetaIngrediente.Ingrediente.TipoIngrediente.ID = 0;
                    //    await _context.TipoIngrediente.AddAsync(recetaIngrediente.Ingrediente.TipoIngrediente);
                    //    await _context.SaveChangesAsync();
                    //    recetaIngrediente.Ingrediente.TipoIngredienteID = recetaIngrediente.Ingrediente.TipoIngrediente.ID;
                    //    recetaIngrediente.Ingrediente.TipoIngrediente = null;
                    //}

                    recetaIngrediente.Ingrediente.TipoIngrediente = null;

                    recetaIngrediente.IngredienteID = 0;
                    recetaIngrediente.Ingrediente.ID = 0;
                    await _context.Ingrediente.AddAsync(recetaIngrediente.Ingrediente);
                    await _context.SaveChangesAsync();
                    recetaIngrediente.IngredienteID = recetaIngrediente.Ingrediente.ID;
                    recetaIngrediente.Ingrediente = null;
                }
            }
            foreach (RecetaPasos recetaPasos in receta.RecetaPasos)
            {
                recetaPasos.ID = 0;
                recetaPasos.RecetaID = 0;

            }
            return receta;
        }
    }
}
