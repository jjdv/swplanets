import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Initialize, GetAll } from '../../ngrx/planets/planets.actions'
import { PlanetsData, planetsT } from 'src/app/services/planets/planets.config';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  planetsList$: Observable<planetsT>;

  constructor(private store: Store<{ planetData: PlanetsData }>) {}

  ngOnInit() {
    this.planetsList$ = this.store.pipe( select('planetsData'), map(planetsData => planetsData.planets) );
    this.store.dispatch(new Initialize())
  }

  loadRest(): void {
    this.store.dispatch(new GetAll())
  }

}
