import { Validator } from 'fluentvalidation-ts';
import { Cattle } from '../Models/cattle.model';

export class CattleFluentValidator extends Validator<Cattle> {
    constructor() {
        super();
        this.ruleFor("code").notNull().greaterThan(0);
        this.ruleFor("breed").notNull().notEmpty().minLength(1);
        this.ruleFor("sex").notNull().notEmpty().minLength(1);
        this.ruleFor("role").notNull().notEmpty().minLength(1);
        this.ruleFor("age").must(age => this.validDateFormat(age));
    }

    public validDateFormat(age: string) {
        let pattern = /^(((\d{1,2}[y][\" \"]){0,1}\d{1,2}[m][\" \"]){0,1})(\d{1,2}[d])$/;
        return pattern.test(age);
    }

}