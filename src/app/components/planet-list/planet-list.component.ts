import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Initialize, GetAll } from '../../ngrx/planets/planets.actions'
import { PlanetsData, planetsT } from 'src/app/services/planets/planets.config';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  private storePlanetsData$: Observable<PlanetsData>;
  planetsList$: Observable<planetsT>;

  constructor(private store$: Store<{planetsData: PlanetsData}>) {
    this.storePlanetsData$ = store$.pipe( select('planetsData') );
  }

  ngOnInit() {
    this.planetsList$ = this.storePlanetsData$.pipe( map(planetsData => planetsData.planets) );
    this.store$.dispatch(new Initialize());

    // preloading data of the rest of the planets (low data volume and high chances it will be used)
    // actualy should be done before displaying the planet list to display the first page according to some sorting criterion
    this.storePlanetsData$.subscribe(planetsData => {
      if (planetsData.state == 'iniData') this.store$.dispatch(new GetAll());
    });
  }

  loadRest(): void {
    this.store$.dispatch(new GetAll());
  }

}
