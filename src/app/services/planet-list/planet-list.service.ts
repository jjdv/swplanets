import { Injectable } from '@angular/core';
import { Initialize, GetAll } from '../../ngrx/planets/planets.actions'
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlanetsData } from '../planets/planets.config';
import { toPlanetList } from './planet-list.service.helpers';

export interface PlanetListEl {
  name: string;
  knownPropsNo: number;
  residentsNo: number;
  filmsNo: number;
}

export type PlanetList = PlanetListEl[] | null;
export type PlanetListProp = null | 'name' | 'knownPropsNo' | 'residentsNo' | 'filmsNo';
export type SortOrder = 'asc' | 'desc'

@Injectable({
  providedIn: 'root'
})
export class PlanetListService {
  list$: Observable<PlanetList>;

  constructor(private store$: Store<{planetsData: PlanetsData}>) {
    this.list$ = this.store$.pipe(
      select(state => state.planetsData.planets),
      map(planets => toPlanetList(planets))
    );
    this.store$.dispatch(new Initialize());

    // preloading data of the rest of the planets (low data volume and high chances it will be used)
    // actualy should be done before displaying the planet list to display the first page according to some sorting criterion
    this.store$.pipe( select(state => state.planetsData.state) ).subscribe(planetsDataState => {
      if (planetsDataState == 'iniData') this.store$.dispatch(new GetAll());
    });
  }
}
