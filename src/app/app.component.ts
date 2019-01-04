import { Component, OnInit } from '@angular/core';
import { Initialize, GetAll } from './ngrx/planets/planets.actions'
import { Store, select } from '@ngrx/store';

import { PlanetsData } from './services/planets/planets.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Star Wars Planets';

  constructor(private store$: Store<{planetsData: PlanetsData}>) {}

  ngOnInit() {
    this.store$.dispatch(new Initialize());

    // preloading data of the rest of the planets (low data volume and high chances it will be used)
    // actualy should be done before displaying the planet list to display the first page according to some sorting criterion
    this.store$.pipe( select(state => state.planetsData.state) ).subscribe(planetsDataState => {
      if (planetsDataState == 'iniData') this.store$.dispatch(new GetAll());
    });
  }
}
