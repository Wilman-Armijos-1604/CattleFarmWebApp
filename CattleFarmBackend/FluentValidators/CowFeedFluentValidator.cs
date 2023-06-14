using CattleFarmAPI.Models;
using FluentValidation;

namespace CattleFarmAPI.FluentValidators
{
    public class CattleFeedFluentValidator: AbstractValidator<CattleFeed>
    {
        public CattleFeedFluentValidator()
        {
            RuleFor(cattleFeed => cattleFeed.CattleCode).NotNull().NotEmpty();
            RuleFor(cattleFeed => cattleFeed.FoodName).NotNull().NotEmpty().MinimumLength(1);
            RuleFor(cattleFeed => cattleFeed.FoodQuantity).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(cattleFeed => cattleFeed.FeedDate).Must(feedDateValidator);
        }

        public bool feedDateValidator(DateTime feedDate)
        {
            return (feedDate.CompareTo(DateTime.Now)!=1);
        }
    }
}
