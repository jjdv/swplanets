import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { PlanetsData, Planet } from '../planets/planets.config';
import { toPlanetList } from './planet-list.service.helpers';

export interface PlanetListEl {
  id: number,
  name: string;
  knownPropsNo: number;
  residentsNo: number;
  filmsNo: number;
}

export type PlanetList = PlanetListEl[];
export type PlanetListProp = null | 'name' | 'knownPropsNo' | 'residentsNo' | 'filmsNo';
export type SortOrder = 'asc' | 'desc'

@Injectable({
  providedIn: 'root'
})
export class PlanetListService {
  list$: BehaviorSubject<PlanetList>;
  details$: BehaviorSubject<Planet[]>;

  constructor(private store$: Store<{planetsData: PlanetsData}>) {
    this.list$ = new BehaviorSubject([]);
    this.details$ = new BehaviorSubject([]);
    this.store$.pipe(
      select(state => state.planetsData.planets),
      tap(details => this.details$.next(details)),
      map(planets => toPlanetList(planets))
    )
    .subscribe(planetList => this.list$.next(planetList));
  }
}
