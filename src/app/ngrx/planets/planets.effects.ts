import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { ActionTypes, SaveIniData, SaveAllData, ReportError } from './planets.actions'
import { GetPlanetsService } from '../../services/get-planets/get-planets.service';

 
@Injectable()
export class PlanetsEffects {
 
    constructor(private getPlanetsService: GetPlanetsService, private actions$: Actions) {}

    getPlanetsAction$(targetState: 'iniData' | 'allData'): Observable<Action> {
        return this.getPlanetsService.getPlanets$(targetState).pipe(
            map(reply => typeof reply !== 'string'
                // If successful (reply as apiData object), dispatch success action with result
                ? ( targetState === 'iniData' ? new SaveIniData(reply) : new SaveAllData(reply) )
                // If error (reply as error string message), dispatch success action with result
                : new ReportError('networkError'))
        )
    }

    @Effect()
    initialize$: Observable<Action> = this.actions$.pipe(
        ofType(ActionTypes.Initialize),
        switchMap(() => this.getPlanetsAction$('iniData'))
    );

    @Effect()
    getAll$: Observable<Action> = this.actions$.pipe(
        ofType(ActionTypes.GetAll),
        switchMap(() => this.getPlanetsAction$('allData'))
    );
}