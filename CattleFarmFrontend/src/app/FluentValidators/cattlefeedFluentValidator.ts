import { Validator } from 'fluentvalidation-ts';
import { CattleFeed } from '../Models/cattlefeed.model';

export class CattleFeedFluentValidator extends Validator<CattleFeed> {
    constructor() {
        super();
        this.ruleFor("cattleFeedCode").notNull().greaterThan(0);
        this.ruleFor("cattleCode").notNull().greaterThan(0);
        this.ruleFor("foodName").notNull().notEmpty().minLength(1);
        this.ruleFor("foodQuantity").notNull().greaterThan(0);
        this.ruleFor("feedDate").notNull();
    }

}