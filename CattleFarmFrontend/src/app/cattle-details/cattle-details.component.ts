import { Component } from '@angular/core';
import { CattleServicesService } from '../Services/cattle-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cattle } from '../Models/cattle.model';
import { CattleFeed } from '../Models/cattlefeed.model';
import { CattleMed } from '../Models/cattlemed.model';
import { CattleFeedServicesService } from '../Services/cattle-feed-services.service';
import { CattleMedServicesService } from '../Services/cattle-med-services.service';
import { DatePipe } from '@angular/common';
import { CattleFeedFluentValidator } from '../FluentValidators/cattlefeedFluentValidator';
import { CattleMedFluentValidator } from '../FluentValidators/cattlemedFluentValidator';
import { CattleFluentValidator } from '../FluentValidators/cattleFluentValidator';

@Component({
  selector: 'app-cattle-details',
  templateUrl: './cattle-details.component.html',
  styleUrls: ['./cattle-details.component.css']
})
export class CattleDetailsComponent {

  dateParser: DatePipe;

  cattleCode: Number = 0;
  formattedMedDate: string = "";
  formattedFeedDate: string = "";

  cattleFeedList: CattleFeed[] = [];
  cattleMedList: CattleMed[] = [];

  cattleInfo: Cattle = {
    code: 1,
    breed: "",
    sex: "",
    role: "",
    age: ""
  }

  validationErrors: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cattleServices: CattleServicesService,
    private cattleFeedServices: CattleFeedServicesService,
    private cattleMedServices: CattleMedServicesService,
    private cattleValidator: CattleFluentValidator,
    private feedValidator: CattleFeedFluentValidator,
    private medValidator: CattleMedFluentValidator
  ) { 
    this.dateParser = new DatePipe('en-US');
  }

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
          this.cattleInfo.code = response.code,
          this.cattleInfo.breed = response.breed,
          this.cattleInfo.sex = response.sex,
          this.cattleInfo.role = response.role,
          this.cattleInfo.age = response.age
          }
          else {
            this.router.navigate(['error'])
          }
      }
    );

    this.cattleFeedServices.getCattleFeedList(this.cattleCode.valueOf()).subscribe(
      (response) => {
        response.forEach(cattleFeed => {
          const feedValidation = this.feedValidator.validate(cattleFeed)
          if (
            feedValidation.cattleCode == null &&
            feedValidation.cattleFeedCode == null &&
            feedValidation.foodName == null &&
            feedValidation.foodQuantity == null &&
            feedValidation.feedDate == null
              ) {
                this.cattleFeedList.push(
                  {
                    cattleFeedCode: cattleFeed.cattleFeedCode,
                    cattleCode: cattleFeed.cattleCode,
                    foodName: cattleFeed.foodName,
                    foodQuantity: cattleFeed.foodQuantity,
                    feedDate: new Date(cattleFeed.feedDate)
                  }
                )
            }
            else {
              this.router.navigate(['error'])
            }
        }
        )
      }
    )

    this.cattleMedServices.getCattleMedList(this.cattleCode.valueOf()).subscribe(
      (response) => {
        response.forEach(cattleMed => {
          const medValidation = this.medValidator.validate(cattleMed)
          if (
            medValidation.cattleCode == null &&
            medValidation.cattleMedCode == null &&
            medValidation.medName == null &&
            medValidation.medQuantity == null &&
            medValidation.medDate == null
              ) {
                this.cattleMedList.push(
                  {
                    cattleMedCode: cattleMed.cattleMedCode,
                    cattleCode: cattleMed.cattleCode,
                    medName: cattleMed.medName,
                    medQuantity: cattleMed.medQuantity,
                    medDate: new Date(cattleMed.medDate)
                  }
                )
            }
            else {
              this.router.navigate(['error'])
            }
        }
        )
      }
    )

  }

  addCattleMed(cattleCode: number) {
    this.router.navigate(['cattle/' + cattleCode + '/med'])
  }

  addCattleFeed(cattleCode: number) {
    this.router.navigate(['cattle/' + cattleCode + '/feed'])
  }

  redirectToHome() {
    this.router.navigate(['home'])
  }

}
