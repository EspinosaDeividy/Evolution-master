using System.Collections.Generic;
using DataEvolution;

namespace BusinessEvolution {
    public class Classificacao {

        public static List<DataEvolution.Models.Classificacao> GetListClassificacao() {
            return DataEvolution.Data.Classificacao.GetListClassificacao();
        }
    }
}
