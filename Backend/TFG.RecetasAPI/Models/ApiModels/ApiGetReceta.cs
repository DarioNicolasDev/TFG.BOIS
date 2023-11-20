using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Ingrediente;
using Models.Preferencia;

namespace Models.ApiModels
{
    public class ApiGetReceta
    {
        public List<Ingrediente.Ingrediente> Ingredientes { get; set; }
        public List<Preferencia.Preferencia>? Preferencias { get; set; }
    }
}
