using System.ComponentModel.DataAnnotations;

namespace CattleFarmAPI.DtoModels
{
    public class CattleMedDto
    {
        public int CattleMedCode { get; set; }

        public int CattleCode { get; set; }

        public DateTime MedDate { get; set; }

        public string MedName { get; set; }

        public double MedQuantity { get; set; }
    }
}
