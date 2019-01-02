import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';

import { planetsIniNo, retryNo, ApiData, PlanetsData, PlanetsIniData } from './planets.config';
import { apiDataOk, mergeApiPlanetsData } from './planets.helpers'


@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  planetsData: PlanetsData = PlanetsIniData;
  
  constructor(private http: HttpClient, private store: Store<{planetsData: PlanetsData}>) {
    store.pipe(select('planetsData')).subscribe((planetsData: PlanetsData) => this.planetsData = planetsData);
  }

  getPlanets$(targetState: 'iniData' | 'allData'): Observable<PlanetsData | string> {
    let planetsData = Object.assign({}, targetState === 'iniData' ? PlanetsIniData : this.planetsData);
    const targetLength = targetState === 'iniData' ? planetsIniNo : this.planetsData.planetsNo;

    return this.http.get<ApiData>(planetsData.nextUrl).pipe(
      retry(retryNo),
      catchError(() => 'networkError'),
      map(val => {
        if (typeof val === 'string') return val;
        if (!apiDataOk(val)) {
          return 'apiError';
        }
        planetsData = mergeApiPlanetsData(planetsData, val)
        if (planetsData.planets.length < targetLength) {
          throw 'repeat';
        }
        return planetsData
      }),
      retry()
    )
  }
}
