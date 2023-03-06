import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/core/services/users';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tour-packages-destinations',
  templateUrl: './tour-packages-destinations.component.html',
  styleUrls: ['./tour-packages-destinations.component.css']
})
export class TourPackagesDestinationsComponent implements OnInit, OnDestroy {

  packageList: any[] = [];
  destinations!: any[];
  tourCategories!: any[];
  destination = null;
  destinationId!: string;
  destinationDetails: any;
  env = environment;
  statesDestinations !: any[];
  state = null;
  stateDetails: any = null;
  showContent: boolean = false;
  placeDetails: any;

  private subscription = new Subscription;

  constructor(private userService: UsersService, private activatedRoute : ActivatedRoute) { }
  
  ngOnInit() {
    this.getDestinationId();
    this.getAllDestinations();
    this.getAllTourCategories();
    }

  getDestinationId(){
    this.activatedRoute.params.subscribe(res => {
      let state = res['state'];
      let destination = res['destination'];

    if(state !== undefined) {
      this.state = state;
      console.log(this.state)
      this.getStatesDestinations(state);
      this.getStateDetails(state)
      this.getPackageList1(state)
    }

    if(destination !== undefined) {
      this.destination = destination;
      console.log(destination)
      this.getDestDetailsByName(destination)
      this.getStateDetails(state)
      this.getPackageList2(destination)
    }
    })
  }

  getStateDetails(state:string){
    this.userService.statesDetailsByName(state).subscribe(res => {
      this.stateDetails = res.data;
      console.log(res)
    })
  }

  /* Get All destination/cities list from state */

  getStatesDestinations(state:string){
    this.userService.getDestinationsWithStates(state).subscribe(res => {
      this.statesDestinations = res.data;
      console.log(this.statesDestinations)
    })
  }


  getAllDestinations(){
   this.subscription = this.userService.tourDestinationsList().subscribe(res => {
      this.destinations = res.data;
    })
  }

  getDestinationDetails(id:string){
    this.subscription =  this.userService.tourDestinationsDetails(id).subscribe(res =>  {
      this.destinationDetails = res.data;
      console.log(this.destinationDetails)
    })
  }

  getDestDetailsByName(name:string) {
    this.subscription = this.userService.destinationsDetailsByName(name).subscribe(res => {
      this.placeDetails = res.data[0];
      console.log(this.placeDetails)
    })
  }

  getAllTourCategories(){
    this.subscription = this.userService.tourCategoriesList().subscribe(res => {
      this.tourCategories = res.data;
      console.log(this.tourCategories, 'category')
    })
  }

  getPackageList1(state:string){
    this.subscription =  this.userService.tourPackagesByState(state).subscribe(res => {
      this.packageList = res.data;
      console.log(this.packageList)
    })
  }

  getPackageList2(destination:string){
    this.subscription =  this.userService.tourPackagesByDestination(destination).subscribe(res => {
      this.packageList = res.data;
      console.log(this.packageList, 'a')
    })
  }

  
  toggleContent(){
    this.showContent = !this.showContent;
  }




  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  
}
