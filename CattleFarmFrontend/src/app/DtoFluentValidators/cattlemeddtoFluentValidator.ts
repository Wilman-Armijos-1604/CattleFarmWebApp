import { Validator } from 'fluentvalidation-ts';
import { CattleMedDto } from '../DtoModels/cattlemeddto.model';

export class CattleMedDtoFluentValidator extends Validator<CattleMedDto> {
    constructor() {
        super();
        this.ruleFor("cattleMedCode").notNull().greaterThan(0);
        this.ruleFor("cattleCode").notNull().greaterThan(0);
        this.ruleFor("medName").notNull().notEmpty().minLength(1);
        this.ruleFor("medQuantity").notNull().greaterThan(0);
        this.ruleFor("medDate").must((medDate)=>this.validateDate(medDate));
    }

    validateDate(medDateString: string) {
        const today = new Date();
        try {
          const medDate = new Date(medDateString);
          return today>=medDate;
          } catch 
        {
          return false;
        }
    }

}