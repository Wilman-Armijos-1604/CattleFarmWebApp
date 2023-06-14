using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CattleFarmAPI.Models
{
    public class CattleMed
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CattleMedCode { get; set; }

        public int CattleCode { get; set; }

        public DateTime MedDate { get; set; }

        public string MedName { get; set; }

        public double MedQuantity { get; set; }
    }
}
