using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataEvolution.Models {
    [Table("Usuario")]
    public class Usuario {

        [Column("UsuarioID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UsuarioID { get; set; }
        [Required]
        public string Nome { get; set; }
    }
}
