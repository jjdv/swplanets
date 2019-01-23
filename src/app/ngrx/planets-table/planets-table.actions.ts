import { Action } from '@ngrx/store';

export enum ActionTypes {
  SavePageSize = '[PlanetsTable Component] SavePageSize',
  SavePageNo = '[PlanetsTable Component] SavePageNo'
}

export class SavePageSize implements Action {
  readonly type = ActionTypes.SavePageSize;

  constructor(public payload: number) {}
}

export class SavePageNo implements Action {
  readonly type = ActionTypes.SavePageNo;

  constructor(public payload: number) {}
}

export type ActionsUnion = SavePageSize | SavePageNo;
