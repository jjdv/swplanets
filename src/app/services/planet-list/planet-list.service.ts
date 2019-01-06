import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PlanetsData, Planet } from '../planets/planets.config';
import { toPlanetListFromLocations, toPlanetList, PlanetListFromLocations, PlanetList } from './planet-list.service.helpers';
import { planetLocations } from './planet-locations'

export { PlanetList, PlanetListEl }  from './planet-list.service.helpers';
export type PlanetListProp = null | 'name' | 'knownPropsNo' | 'residentsNo' | 'filmsNo';
export type SortOrder = 'asc' | 'desc'

@Injectable({
  providedIn: 'root'
})
export class PlanetListService {
  list$: BehaviorSubject<PlanetList>;
  details$: BehaviorSubject<Planet[]>;

  constructor(private store$: Store<{planetsData: PlanetsData}>) {
    const planetListFromLocations: PlanetListFromLocations = toPlanetListFromLocations(planetLocations);

    this.list$ = new BehaviorSubject(toPlanetList(planetListFromLocations, []));
    this.details$ = new BehaviorSubject([]);
    this.store$.pipe(
      select(state => state.planetsData.planets),
      tap(details => this.details$.next(details)),
      map(planets => toPlanetList(planetListFromLocations, planets))
    )
    .subscribe(planetList => this.list$.next(planetList));
  }
}
