using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Ingrediente;

namespace Models.Receta
{
    public class RecetaIngrediente
    {
        [Key]
        public int ID { get; set; }
        public int RecetaID { get; set; }
        public int IngredienteID { get; set; }
        public string Cantidad { get; set; }
        public string UnidadMedida { get; set; }
        public Models.Ingrediente.Ingrediente Ingrediente { get; set; }

    }
}
