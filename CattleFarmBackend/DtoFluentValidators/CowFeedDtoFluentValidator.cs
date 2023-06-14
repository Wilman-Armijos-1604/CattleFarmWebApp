using CattleFarmAPI.DtoModels;
using FluentValidation;

namespace CattleFarmAPI.DtoFluentValidators
{
    public class CattleFeedDtoFluentValidator: AbstractValidator<CattleFeedDto>
    {
        public CattleFeedDtoFluentValidator()
        {
            RuleFor(cattleFeed => cattleFeed.CattleFeedCode).NotNull().NotEmpty().Equals(0);
            RuleFor(cattleFeed => cattleFeed.CattleCode).NotNull().NotEmpty();
            RuleFor(cattleFeed => cattleFeed.FoodName).NotNull().NotEmpty();
            RuleFor(cattleFeed => cattleFeed.FoodQuantity).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(cattleFeed => cattleFeed.FeedDate).Must(feedDateValidator);
        }

        public bool feedDateValidator(DateTime feedDate)
        {
            return (feedDate.CompareTo(DateTime.Now) != 1);
        }
    }
}
