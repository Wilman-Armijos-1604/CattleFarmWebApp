import { Component, OnInit } from '@angular/core';
import { CattleServicesService } from '../Services/cattle-services.service';
import { Router } from '@angular/router';
import { CattleDto } from '../DtoModels/cattledto.model';
import { CattleDtoFluentValidator } from '../DtoFluentValidators/cattledtoFluentValidator';

@Component({
  selector: 'app-add-cattle-form',
  templateUrl: './add-cattle-form.component.html',
  styleUrls: ['./add-cattle-form.component.css']
})
export class AddCattleFormComponent implements OnInit {

  cattleSexOptions: any[] = [
    {
      value: "Male",
    },
    {
      value: "Female"
    }
  ];

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

  cattleToAdd: CattleDto = {
    code: 1,
    breed: "",
    sex: "",
    role: "",
    bornDate: ""
  }

  bornDateString: string = "";

  validationErrors: Boolean = false;

  constructor(
    private router: Router,
    private cattleServices: CattleServicesService,
    private validator: CattleDtoFluentValidator
  ) {

    this.validator = new CattleDtoFluentValidator();
  }

  ngOnInit() {
  }

  addCattle() {
    try {
      this.cattleToAdd.bornDate = new Date(this.bornDateString).toISOString();
      const cattleValidation = this.validator.validate(this.cattleToAdd);
      if (
        cattleValidation.bornDate == null &&
        cattleValidation.code == null &&
        cattleValidation.breed == null &&
        cattleValidation.role == null &&
        cattleValidation.sex == null
      ) {
        this.cattleServices.addCattle(this.cattleToAdd).subscribe(
          (Response) => {
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
    catch (error) {
      this.validationErrors = true;
    }
  }

  redirectToHome() {
    this.router.navigate(['home'])
  }

}
