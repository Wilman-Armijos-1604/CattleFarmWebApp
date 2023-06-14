using CattleFarmAPI.Models;
using FluentValidation;

namespace CattleFarmAPI.FluentValidators
{
    public class CattleFluentValidator: AbstractValidator<Cattle>
    {
        public CattleFluentValidator() {
            RuleFor(cattle => cattle.Breed).NotNull().NotEmpty().MinimumLength(1).WithMessage("Error Raza");
            RuleFor(cattle => cattle.Sex).NotNull().NotEmpty().MinimumLength(1).WithMessage("Error Sexo");
            RuleFor(cattle => cattle.Role).NotNull().NotEmpty().MinimumLength(1).WithMessage("Error Rol");
            RuleFor(cattle => cattle.BornDate).Must(bornDateValidator).WithMessage("Error Fecha");
        }
        public bool bornDateValidator(DateTime bornDate) {
            return (bornDate.CompareTo(DateTime.Now) != 1);
        }

    }
}
