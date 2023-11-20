using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Usuario
{
    public class UsuarioRecetaRealizada
    {
        [Key]
        public int ID { get; set; }
        public int UsuarioID { get; set; }
        public int RecetaID { get; set; }
        public DateTime FechaRealizacion { get; set; }
        public string ComentariosUsuario { get; set; }
        public int Valoracion { get; set; }
    }
}
