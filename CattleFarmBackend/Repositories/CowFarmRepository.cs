using CattleFarmAPI.DtoFluentValidators;
using CattleFarmAPI.DtoModels;
using CattleFarmAPI.FluentValidators;
using CattleFarmAPI.Models;
using CattleFarmAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CattleFarmAPI.Repositories
{
    public class CattleFarmRepository : ICattleFarmRepository
    {
        private readonly CattleFluentValidator _cattleFluentValidator;
        private readonly CattleDtoFluentValidator _cattleDtoFluentValidator;
        private readonly CattleFeedFluentValidator _cattleFeedFluentValidator;
        private readonly CattleFeedDtoFluentValidator _cattleFeedDtoFluentValidator;
        private readonly CattleMedFluentValidator _cattleMedFluentValidator;
        private readonly CattleMedDtoFluentValidator _cattleMedDtoFluentValidator;

        private readonly RepositoryContext _repositoryContext; 
        public CattleFarmRepository() {
            _repositoryContext = new RepositoryContext();

            _cattleFluentValidator = new CattleFluentValidator();
            _cattleDtoFluentValidator = new CattleDtoFluentValidator();
            _cattleMedFluentValidator = new CattleMedFluentValidator();
            _cattleMedDtoFluentValidator = new CattleMedDtoFluentValidator();
            _cattleFeedFluentValidator = new CattleFeedFluentValidator();
            _cattleFeedDtoFluentValidator = new CattleFeedDtoFluentValidator();
        }

        public async Task<IActionResult> GetCattles()
        {
            var cattlesDB = await _repositoryContext.Cattles.ToListAsync();
            List<CattleDto> cattlesDto = new List<CattleDto>();

            if (cattlesDB == null)
            {
                return new NotFoundResult();
            }

            for (int cattleIdx = 0; cattleIdx < cattlesDB.Count; cattleIdx++)
            {
                CattleDto cattleDto = new CattleDto
                {
                    Code = cattlesDB[cattleIdx].Code,
                    Breed = cattlesDB[cattleIdx].Breed,
                    Sex = cattlesDB[cattleIdx].Sex,
                    Role = cattlesDB[cattleIdx].Role,
                    Age = new CattleServices().bornDateToAge(cattlesDB[cattleIdx].BornDate)
                };

                if (_cattleDtoFluentValidator.Validate(cattleDto).IsValid)
                {
                    cattlesDto.Add(cattleDto);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            return new OkObjectResult(cattlesDto);
        }

        public async Task<IActionResult> GetCattleByCode(int cattleCode)
        {
            var cattleDB = await _repositoryContext.Cattles.FindAsync(cattleCode);

            if (cattleDB == null)
            {
                return new BadRequestResult();
            }

            CattleDto cattleDto = new CattleDto
            {
                Code = cattleDB.Code,
                Breed = cattleDB.Breed,
                Sex = cattleDB.Sex,
                Role = cattleDB.Role,
                Age = new CattleServices().bornDateToAge(cattleDB.BornDate)
            };

            if (!_cattleDtoFluentValidator.Validate(cattleDto).IsValid)
            {
                return new NotFoundResult();
            }

            return new OkObjectResult(cattleDto);
        }

        public async Task<IActionResult> AddCattle(Cattle cattle)
        {
            if (!_cattleFluentValidator.Validate(cattle).IsValid)
            {
                return new BadRequestResult();
            }
            var res = _repositoryContext.Cattles.Add(
                new Cattle { 
                    Breed = cattle.Breed,
                    Role = cattle.Role,
                    Sex = cattle.Sex,
                    BornDate = cattle.BornDate
                    }
                );
            await _repositoryContext.SaveChangesAsync();

            return new OkObjectResult(res.State);
        }

        public async Task<IActionResult> UpdateCattleRole(int cattleCode, Cattle cattle)
        {
            if (!_cattleFluentValidator.Validate(cattle).IsValid) 
            {
                return new BadRequestResult(); 
            }

            _repositoryContext.Attach(cattle);
            _repositoryContext.Entry(cattle).Property(cattleMod => cattleMod.Role).IsModified = true;
            await _repositoryContext.SaveChangesAsync();

            return new OkResult();
        }

        public async Task<IActionResult> DeleteCattle(int cattleCode)
        {
            var cattleDelete = await _repositoryContext.Cattles.FindAsync(cattleCode);

            if (cattleDelete == null)
            {
                return new BadRequestResult();
            }

            _repositoryContext.CattleFeeds.RemoveRange(_repositoryContext.CattleFeeds.Where((cattleFeed => cattleFeed.CattleCode == cattleCode)));
            _repositoryContext.RemoveRange(_repositoryContext.CattleMeds.Where(cattleMed => cattleMed.CattleCode == cattleCode));

            _repositoryContext.Cattles.Remove(cattleDelete);
            await _repositoryContext.SaveChangesAsync();

            return new OkResult();
        }

        public async Task<IActionResult> AddCattleFeed(CattleFeed cattleFeed)
        {
            if (!_cattleFeedFluentValidator.Validate(cattleFeed).IsValid)
            {
                return new BadRequestResult();
            }

            var cattle = await _repositoryContext.Cattles.FindAsync(cattleFeed.CattleCode);

            if (cattle == null)
            {
                return new BadRequestResult();
            }

            _repositoryContext.CattleFeeds.Add(
                new CattleFeed
                {
                    CattleCode = cattle.Code,
                    FoodName = cattleFeed.FoodName,
                    FoodQuantity = cattleFeed.FoodQuantity,
                    FeedDate = cattleFeed.FeedDate
                }
                );
            await _repositoryContext.SaveChangesAsync();

            return new OkResult();
        }

        public async Task<IActionResult> GetCattleFeed(int cattleCode)
        {
            var cattleFeedsDB = await _repositoryContext.CattleFeeds.Where(cattleFeed => cattleFeed.CattleCode == cattleCode).ToListAsync();
            List<CattleFeedDto> cattleFeedsDto = new List<CattleFeedDto>();

            if (cattleFeedsDB == null)
            {
                return new NotFoundResult();
            }

            for (int cattleFeedIdx = 0; cattleFeedIdx < cattleFeedsDB.Count; cattleFeedIdx++)
            {
                CattleFeedDto cattleFeedDto = new CattleFeedDto
                {
                    CattleFeedCode = cattleFeedsDB[cattleFeedIdx].CattleFeedCode,
                    CattleCode = cattleFeedsDB[cattleFeedIdx].CattleCode,
                    FoodName = cattleFeedsDB[cattleFeedIdx].FoodName,
                    FoodQuantity = cattleFeedsDB[cattleFeedIdx].FoodQuantity,
                    FeedDate = cattleFeedsDB[cattleFeedIdx].FeedDate,
                };

                if (_cattleFeedDtoFluentValidator.Validate(cattleFeedDto).IsValid)
                {
                    cattleFeedsDto.Add(cattleFeedDto);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            return new OkObjectResult(cattleFeedsDto);
        }

        public async Task<IActionResult> AddCattleMed(CattleMed cattleMed)
        {
            if (!_cattleMedFluentValidator.Validate(cattleMed).IsValid)
            {
                return new BadRequestResult();
            }

            var cattle = await _repositoryContext.Cattles.FindAsync(cattleMed.CattleCode);

            if (cattle == null)
            {
                return new BadRequestResult();
            }

            _repositoryContext.CattleMeds.Add(
                new CattleMed
                {
                    CattleCode = cattle.Code,
                    MedName = cattleMed.MedName,
                    MedQuantity = cattleMed.MedQuantity,
                    MedDate = cattleMed.MedDate
                }
                );
            await _repositoryContext.SaveChangesAsync();

            return new OkResult();
        }

        public async Task<IActionResult> GetCattleMed(int cattleCode)
        {
            var cattleMedsDB = await _repositoryContext.CattleMeds.Where(cattleMed => cattleMed.CattleCode == cattleCode).ToListAsync();
            List<CattleMedDto> cattleMedsDto = new List<CattleMedDto>();

            if (cattleMedsDB == null)
            {
                return new NotFoundResult();
            }

            for (int cattleMedIdx = 0; cattleMedIdx < cattleMedsDB.Count; cattleMedIdx++)
            {
                CattleMedDto cattleMedDto = new CattleMedDto
                {
                    CattleMedCode = cattleMedsDB[cattleMedIdx].CattleMedCode,
                    CattleCode = cattleMedsDB[cattleMedIdx].CattleCode,
                    MedName = cattleMedsDB[cattleMedIdx].MedName,
                    MedQuantity = cattleMedsDB[cattleMedIdx].MedQuantity,
                    MedDate = cattleMedsDB[cattleMedIdx].MedDate,
                };

                if (_cattleMedDtoFluentValidator.Validate(cattleMedDto).IsValid)
                {
                    cattleMedsDto.Add(cattleMedDto);
                }
                else
                {
                    return new NotFoundResult();
                }
            }
            return new OkObjectResult(cattleMedsDto);
        }

    }
}