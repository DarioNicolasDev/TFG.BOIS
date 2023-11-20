using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Receta
{
    public class Receta
    {
        [Key]
        public int ID { get; set; }
        public string NombreReceta { get; set; }
        public string DescripcionReceta { get; set; }
        public string Autor { get; set; }
        public int Dificultad { get; set; }
        public int CantidadPorciones { get; set; }
        public int TipoRecetaID { get; set; }
        public string ImagenRecetaURL { get; set; }
        public string TiempoPreparacion { get; set; }

        public List<RecetaPreferencia> RecetaPreferencias { get; set; }
        public List<RecetaIngrediente> RecetaIngredientes { get; set; }
        public List<RecetaPasos> RecetaPasos { get; set; }
    }
}
