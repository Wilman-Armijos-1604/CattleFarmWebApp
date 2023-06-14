using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CattleFarmAPI.Models
{
    public class Cattle
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        public string Breed { get; set; }

        public string Sex { get; set; }

        public string Role { get; set; }

        public DateTime BornDate { get; set; }

    }
}