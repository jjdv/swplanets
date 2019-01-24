import { Action } from '@ngrx/store';

export enum ActionTypes {
  SavePageSize = '[PlanetsTable Component] SavePageSize',
  SavePageNo = '[PlanetsTable Component] SavePageNo',
  SaveFilter = '[PlanetsTable Component] SaveFilter'
}

export class SavePageSize implements Action {
  readonly type = ActionTypes.SavePageSize;

  constructor(public payload: number) {}
}

export class SavePageNo implements Action {
  readonly type = ActionTypes.SavePageNo;

  constructor(public payload: number) {}
}

export class SaveFilter implements Action {
  readonly type = ActionTypes.SaveFilter;

  constructor(public payload: string) {}
}

export type ActionsUnion = SavePageSize | SavePageNo | SaveFilter;
