using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace CattleFarmAPI.Models
{
    public class CattleFeed
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CattleFeedCode { get; set; }

        public int CattleCode { get; set; }

        public DateTime FeedDate { get; set; }

        public string FoodName { get; set; }

        public double FoodQuantity { get; set; }
    }
}
