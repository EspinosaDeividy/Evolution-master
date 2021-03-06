﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Evolution.Models {

    [Table("Classificacao")]
    public class Classificacao {

        [Column("ClassificacaoID")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ClassificacaoID { get; set; }
        [Required]
        public string Descricao { get; set; }

    }
}