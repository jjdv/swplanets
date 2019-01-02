import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import { Initialize } from '../../ngrx/planets/planets.actions'
import { PlanetsData, planetsT } from 'src/app/services/planets/planets.config';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent implements OnInit {
  planetList$: Observable<planetsT>;

  constructor(private store: Store<{ planetData: PlanetsData }>) {}

  ngOnInit() {
    this.store.dispatch(new Initialize())
    this.planetList$ = this.store.pipe( select('planetData'), map(planetData => planetData.planets) );
  }

}
