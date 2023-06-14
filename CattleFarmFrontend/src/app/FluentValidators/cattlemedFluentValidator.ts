import { Validator } from 'fluentvalidation-ts';
import { CattleMed } from '../Models/cattlemed.model';

export class CattleMedFluentValidator extends Validator<CattleMed> {
    constructor() {
        super();
        this.ruleFor("cattleMedCode").notNull().greaterThan(0);
        this.ruleFor("cattleCode").notNull().greaterThan(0);
        this.ruleFor("medName").notNull().notEmpty().minLength(1);
        this.ruleFor("medQuantity").notNull().greaterThan(0);
        this.ruleFor("medDate").notNull();
    }

}