import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ActionTypes, SaveIniData, ReportError } from './planets.actions'
import { PlanetsService } from '../../services/planets/planets.service';

 
@Injectable()
export class PlanetsEffects {
 
    constructor(private planetsService: PlanetsService, private actions$: Actions) {}

    getPlanetsAction$(targetState: 'iniData' | 'allData'): Observable<Action> {
        return this.planetsService.getPlanets$(targetState).pipe(
            map(reply => typeof reply !== 'string'
                // If successful (reply as apiData object), dispatch success action with result
                ? new SaveIniData(reply)
                // If error (reply as error string message), dispatch success action with result
                : new ReportError('networkError'))
        )
    }

    @Effect()
    initialize$: Observable<Action> = this.actions$.pipe(
        ofType(ActionTypes.Initialize),
        switchMap(action => this.getPlanetsAction$('iniData'))
    );
}