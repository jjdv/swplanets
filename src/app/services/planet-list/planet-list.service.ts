import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Planet } from '../planets/planets.config';
import { PlanetsService } from '../planets/planets.service'

export interface planetListData {
  name: string;
  knownPropsNo: number;
  residentsNo: number;
  filmsNo: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlanetListService {

  constructor(private planetsService: PlanetsService) { }

  private toPlanetListData(planetArr: Planet[]): planetListData[] {
    const planetListData = [];
    planetArr.forEach(planet => planetListData.push({
      name: planet.name,
      knownPropsNo: 8 - Object.values(planet).filter(val => val == 'unknown').length,
      residentsNo: planet.residents.length,
      filmsNo: planet.films.length
    }));
    return planetListData;
  }
/*
  getPlanetList$(): Observable<planetListData[]> {
    return this.planetsService.getPlanets().pipe(
      map(planets => this.toPlanetListData(planets))
    )
  }*/
}
