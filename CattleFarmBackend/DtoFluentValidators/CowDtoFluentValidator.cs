using CattleFarmAPI.DtoModels;
using System.Text.RegularExpressions;
using FluentValidation;

namespace CattleFarmAPI.DtoFluentValidators
{
    public class CattleDtoFluentValidator: AbstractValidator<CattleDto>
    {
        public CattleDtoFluentValidator()
        {
            RuleFor(cattle => cattle.Code).NotNull().NotEmpty().WithMessage("Code Error");
            RuleFor(cattle => cattle.Breed).NotNull().NotEmpty().WithMessage("Breed Error"); ;
            RuleFor(cattle => cattle.Sex).NotNull().NotEmpty().WithMessage("Sex Error"); ;
            RuleFor(cattle => cattle.Role).NotNull().NotEmpty().WithMessage("Role Error"); ;
            RuleFor(cattle => cattle.Age).Must(ageFormatValidator).WithMessage("Age Error"); ;
        }

        public bool ageFormatValidator(string age)
        {
            string pattern = "^(((\\d{1,2}[y][\" \"]){0,1}\\d{1,2}[m][\" \"]){0,1})(\\d{1,2}[d])$";
            Regex regex = new Regex(pattern);
            return regex.IsMatch(age!);
        }
    }
}
