import { ActionTypes, ActionsUnion } from './planets-table.actions'

export interface PlanetsTableState {
  pageSize: number;
  pageNo: number;
}

const planetsTableStateIni: PlanetsTableState = {
  pageSize: 25,
  pageNo: 2
}

export function planetsTableReducer(state: PlanetsTableState = planetsTableStateIni, action: ActionsUnion): PlanetsTableState {
  switch (action.type) {

    case ActionTypes.SavePageSize: return {...state, pageSize: action.payload};

    case ActionTypes.SavePageNo: return {...state, pageNo: action.payload};

    default: return state;
  }
}
