import { Component } from '@angular/core';
import { CattleFeedDto } from '../DtoModels/cattlefeeddto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CattleFeedServicesService } from '../Services/cattle-feed-services.service';
import { CattleFeedDtoFluentValidator } from '../DtoFluentValidators/cattlefeeddtoFluentValidator';

@Component({
  selector: 'app-add-cattle-feed-form',
  templateUrl: './add-cattle-feed-form.component.html',
  styleUrls: ['./add-cattle-feed-form.component.css']
})
export class AddCattleFeedFormComponent {

  cattleCode: number = 1;
  cattleFeedCode: number = 1;

  feedDateString: string = ""
  foodQuantity: string = ""

  validationErrors: boolean = false;

  cattleFeedtoAdd: CattleFeedDto = {
    cattleFeedCode: 1,
    cattleCode: 1,
    foodName: "",
    foodQuantity: 0.0,
    feedDate: ""
  }

  constructor(
    private router: Router,
    private cattleMedServices: CattleFeedServicesService,
    private route: ActivatedRoute,
    private validator: CattleFeedDtoFluentValidator
  ) {
    this.validator = new CattleFeedDtoFluentValidator();
  }

  
  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.cattleCode = parseInt(params["cattleCode"])
      }
    )
  }

  addCattleFeeds() {
    this.cattleFeedtoAdd.cattleCode = this.cattleCode;
    try {
      this.cattleFeedtoAdd.feedDate = new Date(this.feedDateString).toISOString();
      this.cattleFeedtoAdd.foodQuantity = parseFloat(this.foodQuantity);
      const cattleFeedValidation = this.validator.validate(this.cattleFeedtoAdd);
      if (
        cattleFeedValidation.cattleFeedCode == null &&
        cattleFeedValidation.cattleCode == null &&
        cattleFeedValidation.foodName == null &&
        cattleFeedValidation.foodQuantity == null &&
        cattleFeedValidation.feedDate == null
      ) {
        this.cattleMedServices.addCattleFeed(this.cattleFeedtoAdd).subscribe(
          (response) => {
            this.router.navigate(['cattle/'+this.cattleCode]);
          },
          (error) => {
            this.router.navigate(['error']);
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
