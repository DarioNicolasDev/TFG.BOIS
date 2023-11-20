using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Usuario
{
    public class Usuario
    {
        [Key]
        public int ID { get; set; }
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool Habilitado { get; set; }

        public List<UsuarioPreferencia>? UsuarioPreferencias { get; set; }

        public Usuario()
        {
            UsuarioPreferencias = new List<UsuarioPreferencia>();
        }

    }
}
