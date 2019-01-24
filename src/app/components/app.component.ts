import { Component, OnInit } from '@angular/core';
import { Initialize, GetAll } from '../ngrx/planets-data/planets-data.actions'
import { Store, select } from '@ngrx/store';

import { PlanetsData } from '../services/get-planets/get-planets.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Star Wars Planets';

  constructor(private store$: Store<{planetsData: PlanetsData}>) {}

  ngOnInit() {

    // initialization of data pull from SWAPI
    // at the current app architecture it would make sense to include some basic planet data in the app
    // but it's left this way to show cooperation with the SWAPI
    this.store$.dispatch(new Initialize());

    // Preloading data of the rest of the planets (low data volume and high chances it will be used).
    // Actualy should be done before displaying the planet list to display the first page according to some sorting criterion
    // but I wanted to show some code/data split approach with dynamic loading technique
    this.store$.pipe( select(state => state.planetsData.state) ).subscribe(planetsDataState => {
      if (planetsDataState == 'iniData') this.store$.dispatch(new GetAll());
    });
  }
}
