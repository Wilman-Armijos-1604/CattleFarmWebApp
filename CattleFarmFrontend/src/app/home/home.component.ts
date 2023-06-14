import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cattle } from '../Models/cattle.model';
import { CattleServicesService } from '../Services/cattle-services.service';
import { CattleFluentValidator } from '../FluentValidators/cattleFluentValidator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cattles: Cattle[] = [ ];

  constructor(
    private router: Router, 
    private cattleServices: CattleServicesService,
    private validator: CattleFluentValidator
    ) {}

  ngOnInit() {
    this.getCattles();
  }
  
  redirectToAddCattleForm() {
    this.router.navigate(['/cattleForm'])
  }

  redirectToCattle(cattleCode: number) {
    this.router.navigate(['/cattle/'+cattleCode]);
  }

  getCattles() {
    this.cattleServices.getCattlesList().subscribe(
      (response) => {
        response.forEach(cattle => {
          const cattleValidation = this.validator.validate(cattle);
          if (
            cattleValidation.code == null &&
            cattleValidation.age == null &&
            cattleValidation.breed == null &&
            cattleValidation.breed == null &&
            cattleValidation.age == null
          ) {
            this.cattles.push(
              {
                code: cattle.code,
                breed: cattle.breed,
                sex: cattle.sex,
                role: cattle.role,
                age: cattle.age
              }
            )
          } else {
            this.router.navigate(['/error'])
          }
        });
      },
      (error) => {
        this.router.navigate(['/error'])
      }
    );
  }

  updateCattleRole(cattleCode: number) {
    this.router.navigate(['/cattle/'+cattleCode+'/update'])
  }

  deleteCattle(cattleCode: number) {
    this.cattleServices.deleteCattle(cattleCode).subscribe(
      (response) => {
        
      },
      (error) => {
        this.router.navigate(['/error'])
      }
    )
    this.cattles = this.cattles.filter((cattle) => cattle.code !== cattleCode)
  }

}
