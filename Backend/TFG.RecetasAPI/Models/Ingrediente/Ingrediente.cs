using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Ingrediente
{
    public class Ingrediente
    {
        [Key]
        public int ID { get; set; }
        public string NombreIngrediente { get; set; }
        public string DescripcionIngrediente { get; set; }
        public int TipoIngredienteID { get; set; }
        public TipoIngrediente TipoIngrediente { get; set; }
    }
}
