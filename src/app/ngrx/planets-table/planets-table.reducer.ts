import { ActionTypes, ActionsUnion } from './planets-table.actions'

export interface PlanetsTableState {
  pageSize: number;
  pageNo: number;
  filter: string;
}

const planetsTableStateIni: PlanetsTableState = {
  pageSize: 10,
  pageNo: 0,
  filter: ''
}

export function planetsTableReducer(state: PlanetsTableState = planetsTableStateIni, action: ActionsUnion): PlanetsTableState {
  switch (action.type) {

    case ActionTypes.SavePageSize: return {...state, pageSize: action.payload};

    case ActionTypes.SavePageNo: return {...state, pageNo: action.payload};

    case ActionTypes.SaveFilter: return {...state, filter: action.payload};

    default: return state;
  }
}
