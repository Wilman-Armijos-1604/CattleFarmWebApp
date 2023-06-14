import { Validator } from 'fluentvalidation-ts';
import { CattleFeedDto } from '../DtoModels/cattlefeeddto.model';

export class CattleFeedDtoFluentValidator extends Validator<CattleFeedDto> {
    
    constructor() {
        super();
        this.ruleFor("cattleFeedCode").notNull().greaterThan(0);
        this.ruleFor("cattleCode").notNull().greaterThan(0);
        this.ruleFor("foodName").notNull().notEmpty().minLength(1);
        this.ruleFor("foodQuantity").notNull().greaterThan(0);
        this.ruleFor("feedDate").must((feedDate)=>this.validateDate(feedDate));
    }

    validateDate(feedDateString: string) {
        const today = new Date();
        try {
          const feedDate = new Date(feedDateString);
          return today>=feedDate;
        } catch 
        {
          return false;
        }
    }

}