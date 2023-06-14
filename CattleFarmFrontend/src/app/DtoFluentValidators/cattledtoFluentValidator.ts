import { Validator } from 'fluentvalidation-ts';
import { CattleDto } from '../DtoModels/cattledto.model';

export class CattleDtoFluentValidator extends Validator<CattleDto> {

    cattleSexOptions: any[] =[
        {
          value: "Male",
        },
        {
          value: "Female"
        }
      ];
    
      cattleRoleOptions: any[] =[
        {
          value: "Meat Production",
        },
        {
          value: "Milk Production"
        },
        {
          value: "Reproduction",
        },
        {
          value: "Working"
        },
        {
          value: "Exhibition",
        },
        {
          value: "Idle Role"
        },
        {
          value: "Others",
        },
      ];

    constructor() {
        super();
        this.ruleFor("code").notNull().greaterThan(0);
        this.ruleFor("breed").notNull().notEmpty().minLength(1);
        this.ruleFor("sex").must((sex)=>this.checkSex(sex));
        this.ruleFor("role").must((role)=>this.checkRole(role));
        this.ruleFor("bornDate").must((bornDate)=>this.validateDate(bornDate));
    }

    validateDate(bornDateString: string) {
      const today = new Date();
      try {
        const bornDate = new Date(bornDateString);
        return today>=bornDate;
      } catch 
      {
        return false;
      }
    }

    checkSex(sex: string){
        return (this.cattleSexOptions.some((val)=>val.value===sex));
    }

    checkRole(role: string){
        return (this.cattleRoleOptions.some((val)=>val.value===role));
    }

}