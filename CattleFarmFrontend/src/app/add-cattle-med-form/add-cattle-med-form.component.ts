import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CattleMedServicesService } from '../Services/cattle-med-services.service';
import { CattleMedDto } from '../DtoModels/cattlemeddto.model';
import { CattleMedDtoFluentValidator } from '../DtoFluentValidators/cattlemeddtoFluentValidator';

@Component({
  selector: 'app-add-cattle-med-form',
  templateUrl: './add-cattle-med-form.component.html',
  styleUrls: ['./add-cattle-med-form.component.css']
})
export class AddCattleMedFormComponent implements OnInit {

  cattleCode: number = 1;
  cattleMedCode: number = 1;

  medDateString: string = ""
  medQuantity: string = ""

  validationErrors: boolean = false;

  cattleMedtoAdd: CattleMedDto = {
    cattleMedCode: 1,
    cattleCode: 1,
    medName: "",
    medQuantity: 0.0,
    medDate: ""
  }

  constructor(
    private router: Router,
    private cattleMedServices: CattleMedServicesService,
    private route: ActivatedRoute,
    private validator: CattleMedDtoFluentValidator
  ) {
    
  }

  
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.cattleCode = parseInt(params["cattleCode"])
      }
    )
    this.validator = new CattleMedDtoFluentValidator();
  }

  addCattleMeds() {
    this.cattleMedtoAdd.cattleCode = this.cattleCode;
    try {
      this.cattleMedtoAdd.medDate = new Date(this.medDateString).toISOString();
      this.cattleMedtoAdd.medQuantity = parseFloat(this.medQuantity);
      const cattleMedValidation = this.validator.validate(this.cattleMedtoAdd);
      if (
        cattleMedValidation.cattleMedCode == null &&
        cattleMedValidation.cattleCode == null &&
        cattleMedValidation.medName == null &&
        cattleMedValidation.medQuantity == null &&
        cattleMedValidation.medDate == null
      ) {
        this.cattleMedServices.addCattleMed(this.cattleMedtoAdd).subscribe(
          (response) => {
            this.router.navigate(['cattle/'+this.cattleCode]);
          },
          (error) => {
            this.router.navigate(['/error']);
          }
        );
      }
      else {
        this.validationErrors = true;
      }
    }
    catch (error) {
      this.validationErrors = true;
    }
  }

  redirectToCattle() {
    this.router.navigate(['cattle/'+this.cattleCode]);
  }

}
