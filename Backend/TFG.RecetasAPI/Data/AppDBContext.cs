using Microsoft.EntityFrameworkCore;
using Models.Ingrediente;
using Models.OpenAI;
using Models.Preferencia;
using Models.Receta;
using Models.Usuario;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<Ingrediente> Ingrediente { get; set; }
        public DbSet<TipoIngrediente> TipoIngrediente { get; set; }
        public DbSet<Preferencia> Preferencia { get; set; }
        public DbSet<TipoPreferencia> TipoPreferencia { get; set; }
        public DbSet<Receta> Receta { get; set; }
        public DbSet<RecetaIngrediente> RecetaIngrediente { get; set; }
        public DbSet<RecetaPasos> RecetaPasos { get; set; }
        public DbSet<RecetaPreferencia> RecetaPreferencia { get; set; }
        public DbSet<TipoReceta> TipoReceta { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<UsuarioPreferencia> UsuarioPreferencia { get;set; }
        public DbSet<UsuarioRecetaRealizada> UsuarioRecetaRealizada { get; set; }
        public DbSet<InvocacionIA> InvocacionIA { get; set; }
        public DbSet<ParametroOpenAI> ParametroOpenAI { get; set; }

    }
}
