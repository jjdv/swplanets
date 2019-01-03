import { Injectable } from '@angular/core';
import { Initialize, GetAll } from '../../ngrx/planets/planets.actions'
import { Store, select } from '@ngrx/store';

import { Planet,PlanetsData, planetsIniNo } from '../planets/planets.config';
import { toPlanetList, sortPlanetList, getPage } from './planet-list.service.helpers'

export interface PlanetListEl {
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
  private _planetsListSrc: PlanetList = [];
  private _sortProp: PlanetListProp = null;
  private _sortOrder: SortOrder = 'asc';
  private _pageSize: number = planetsIniNo;
  private _pageNo: number = 0;
  private _planetsList: PlanetList = [];

  constructor(private store$: Store<{planetsData: PlanetsData}>) {
    this.store$.pipe( select((state: any) => state.planetsData.planets) ).subscribe(planetsList => {
      this.set(planetsList)
    });
    this.store$.dispatch(new Initialize());

    // preloading data of the rest of the planets (low data volume and high chances it will be used)
    // actualy should be done before displaying the planet list to display the first page according to some sorting criterion
    this.store$.pipe( select((state: any) => state.planetsData.state) ).subscribe(planetsDataState => {
      if (planetsDataState == 'iniData') this.store$.dispatch(new GetAll());
    });
  }

  private set(planetsDataList: Planet[]): void {
    this._planetsListSrc = toPlanetList(planetsDataList);
    if (this._sortOrder) sortPlanetList(this._planetsListSrc, this._sortProp, this._sortOrder);
    this.resetPageView();
  }

  private resetPageView() {
    this._pageNo = 0;
    this._planetsList = getPage(this._planetsListSrc, this._pageNo, this._pageSize)
  }

  get sortProp(): PlanetListProp {return this._sortProp;}
  get order(): SortOrder {return this._sortOrder;}
  get pageSize(): number {return this._pageSize;}
  get page(): number {return this._pageNo;}
  get list(): PlanetList {return this._planetsList;}

  sort(_sortProp: PlanetListProp, _sortOrder: SortOrder): void {
    if (_sortProp == this._sortProp && _sortOrder == this._sortOrder) return;

    this._sortProp = _sortProp;
    this._sortOrder = _sortOrder;
    sortPlanetList(this._planetsListSrc, this._sortProp, this._sortOrder);
    this.resetPageView();
  }

  setPage(_pageNo: number): void {
    if (_pageNo == this._pageNo) return;
    this._pageNo = _pageNo

    this._planetsList = getPage(this._planetsListSrc, this._pageNo, this._pageSize)
  }

  setPageSize(_pageSize: number): void {
    if (_pageSize == this._pageSize) return;

    this._pageSize = _pageSize
    this.resetPageView();
  }
}
