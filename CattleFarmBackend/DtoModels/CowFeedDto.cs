namespace CattleFarmAPI.DtoModels
{
    public class CattleFeedDto
    {
        public int CattleFeedCode { get; set; }

        public int CattleCode { get; set; }

        public DateTime FeedDate { get; set; }

        public string FoodName { get; set; }

        public double FoodQuantity { get; set; }
    }
}
