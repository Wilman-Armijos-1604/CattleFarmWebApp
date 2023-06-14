using CattleFarmAPI.Models;
using FluentValidation;

namespace CattleFarmAPI.FluentValidators
{
    public class CattleMedFluentValidator: AbstractValidator<CattleMed>
    {
        public CattleMedFluentValidator() {
            RuleFor(cattleMed => cattleMed.CattleCode).NotNull().NotEmpty();
            RuleFor(cattleMed => cattleMed.MedName).NotNull().NotEmpty().MinimumLength(1);
            RuleFor(cattleMed => cattleMed.MedQuantity).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(cattleMed => cattleMed.MedDate).Must(medDateValidator);
        }

        public bool medDateValidator(DateTime medDate)
        {
            return (medDate.CompareTo(DateTime.Now) != 1);
        }
    }
}
