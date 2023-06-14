using CattleFarmAPI.DtoModels;
using FluentValidation;

namespace CattleFarmAPI.DtoFluentValidators
{
    public class CattleMedDtoFluentValidator: AbstractValidator<CattleMedDto>
    {
        public CattleMedDtoFluentValidator()
        {
            RuleFor(cattleMed => cattleMed.CattleMedCode).NotNull().NotEmpty().Equals(0);
            RuleFor(cattleMed => cattleMed.CattleCode).NotNull().NotEmpty();
            RuleFor(cattleMed => cattleMed.MedName).NotNull().NotEmpty();
            RuleFor(cattleMed => cattleMed.MedQuantity).NotNull().NotEmpty().GreaterThan(0);
            RuleFor(cattleMed => cattleMed.MedDate).Must(medDateValidator);
        }

        public bool medDateValidator(DateTime medDate)
        {
            return (medDate.CompareTo(DateTime.Now) != 1);
        }
    }
}
