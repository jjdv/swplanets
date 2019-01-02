import { Action } from '@ngrx/store';
import { PlanetsData } from 'src/app/services/planets/planets.config';

export enum ActionTypes {
    Initialize = '[PlanetList Component] Initialize',
    SaveIniData = '[PlanetList Component] SaveIniData',
    GetAll = '[PlanetList Component] GetAll',
    SaveAllData = '[PlanetList Component] SaveAllData',
    Reload = '[PlanetList Component] Reload',
    ReportError = '[PlanetList Component] ReportError'
}

export class Initialize implements Action {
  readonly type = ActionTypes.Initialize;
}

export class SaveIniData implements Action {
  readonly type = ActionTypes.SaveIniData;

  constructor(public payload: PlanetsData) {}
}

export class GetAll implements Action {
  readonly type = ActionTypes.GetAll;
}

export class SaveAllData implements Action {
  readonly type = ActionTypes.SaveAllData;

  constructor(public payload: PlanetsData) {}
}

export class Reload implements Action {
  readonly type = ActionTypes.Reload;
}

export class ReportError implements Action {
  readonly type = ActionTypes.ReportError;

  constructor(public payload: 'apiError' | 'networkError') {}
}

export type ActionsUnion = Initialize | SaveIniData | GetAll | SaveAllData | Reload;
