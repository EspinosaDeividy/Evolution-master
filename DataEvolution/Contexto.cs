using System.Data.Entity;
using DataEvolution.Models;

namespace DataEvolution {
    public class Contexto : DbContext  {

        public DbSet<Classificacao> Cliente { get; set; }

    }
}
