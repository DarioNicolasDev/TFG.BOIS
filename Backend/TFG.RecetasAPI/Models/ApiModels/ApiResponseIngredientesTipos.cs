using Models.Ingrediente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace Models.ApiModels
{
    public class ApiResponseIngredientesTipos
    {
        public List<Ingrediente.Ingrediente> Ingredientes { get; set; }
        public List<TipoIngrediente> TiposIngrediente { get; set; }

        public ApiResponseIngredientesTipos()
        {
            Ingredientes = new List<Ingrediente.Ingrediente>();
            TiposIngrediente = new List<TipoIngrediente>();
        }
    }
}
