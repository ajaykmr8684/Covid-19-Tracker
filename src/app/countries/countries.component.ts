import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
import { merge } from 'rxjs';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  data: any=[];
  countries: string[] =[];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  dateWiseData;
  selectedCountryData : DateWiseData[];
  

  constructor(private dataService: DataServiceService) { 
    
  }

  ngOnInit(): void {

  
    
    this.dataService.getDateWiseData().subscribe(
      (result)=>{
        this.dateWiseData = result;
        
      }
    )


    this.dataService.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cs=>{
        this.countries.push(cs.country)
        this.updateValues('Afghanistan');

      })
    })

  }

  updateValues(country:string){
    this.data.forEach(cs=>{
      if(cs.country == country){
        this.totalActive = cs.active,
        this.totalConfirmed = cs.confirmed,
        this.totalDeaths = cs.deaths,
        this.totalRecovered = cs.recovered
      }
    })

    this.selectedCountryData = this.dateWiseData[country]
  }

}
