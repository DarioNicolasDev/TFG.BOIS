using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Usuario
{
    public class UsuarioPreferencia
    {
        [Key]
        public int ID { get; set; }
        public int UsuarioID { get; set; }
        public int PreferenciaID { get; set; }

        public Preferencia.Preferencia? Preferencia { get; set; }
    }
}
