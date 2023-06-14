import { Component, OnInit } from '@angular/core';
import { CattleServicesService } from '../Services/cattle-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cattle } from '../Models/cattle.model';
import { CattleDto } from '../DtoModels/cattledto.model';
import { CattleDtoFluentValidator } from '../DtoFluentValidators/cattledtoFluentValidator';
import { CattleFluentValidator } from '../FluentValidators/cattleFluentValidator';

@Component({
  selector: 'app-update-cattle-form',
  templateUrl: './update-cattle-form.component.html',
  styleUrls: ['./update-cattle-form.component.css']
})
export class UpdateCattleFormComponent implements OnInit {

  cattleRoleOptions: any[] = [
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

  cattleToUpdate: CattleDto = {
    code: 1,
    breed: "",
    sex: "",
    role: "",
    bornDate: new Date("2010-01-01").toISOString()
  }

  cattleRetrieved: Cattle = {
    code: 1,
    breed: "",
    sex: "",
    role: "",
    age: ""
  }

  cattleCode: number = 1;

  validationErrors: Boolean = false;

    constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private cattleServices: CattleServicesService,
    private cattleValidator: CattleFluentValidator,
    private cattleDtoValidator: CattleDtoFluentValidator
    ) {}

    ngOnInit() {
      this.route.params.subscribe(
        (params) => {
           this.cattleCode = params["cattleCode"];
        }
      )
      this.cattleServices.getCattleByID(this.cattleCode.valueOf()).subscribe(
        (response) => {
          const cattleValidation = this.cattleValidator.validate(response)
          if (
            cattleValidation.code == null &&
            cattleValidation.breed == null &&
            cattleValidation.sex == null &&
            cattleValidation.role == null &&
            cattleValidation.age == null
              ) {
              this.cattleRetrieved.code=response.code,
              this.cattleRetrieved.breed=response.breed,
              this.cattleRetrieved.sex=response.sex,
              this.cattleRetrieved.role=response.role,
              this.cattleRetrieved.age=response.age
            }
            else {
              this.router.navigate(['error'])
            }
        }
      );
    }

    updateCattle() {
      this.cattleToUpdate.code = this.cattleRetrieved.code;
      this.cattleToUpdate.breed = this.cattleRetrieved.breed;
      this.cattleToUpdate.sex = this.cattleRetrieved.sex;
      this.cattleToUpdate.role = this.cattleRetrieved.role;

      const cattleValidation = this.cattleDtoValidator.validate(this.cattleToUpdate);
      if (
        cattleValidation.bornDate == null &&
        cattleValidation.code == null &&
        cattleValidation.breed == null &&
        cattleValidation.role == null &&
        cattleValidation.sex == null
      ) {
        
      this.cattleServices.updateCattle(this.cattleCode, this.cattleToUpdate).subscribe(
        (response) => {
          this.router.navigate(['/home'])
        },
        (error) => {
          this.router.navigate(['/error'])
        }
      )
      }
      else {
        this.validationErrors = true;
      }
    }

    redirectToHome() {
      this.router.navigate(['home'])
    }

}
