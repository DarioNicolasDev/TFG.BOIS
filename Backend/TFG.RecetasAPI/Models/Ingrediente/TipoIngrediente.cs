using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.PortableExecutable;
using System.Text;
using System.Threading.Tasks;

namespace Models.Ingrediente
{
    public class TipoIngrediente
    {
        public int ID { get; set; }
        public string NombreTipoIngrediente { get; set; }
        public string DescripcionTipoIngrediente { get; set; }
    }
}
