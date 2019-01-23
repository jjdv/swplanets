import { PlanetsData, PlanetsIniData } from '../../services/get-planets/get-planets.config'
import { ActionTypes, ActionsUnion } from './planets-data.actions'

function stateUpdatedWithPayload(state, payload) {
  if (typeof payload === 'string') return {...state, state: payload}; // i.e. error occured and error Message is in payload
  else if (
    typeof payload.planetsNo === 'number' &&
    Array.isArray(payload.planets)
  ) return {...payload, state: 'iniData'};
  else  return {...state, state: 'apiError'};
}

export function planetsDataReducer(state: PlanetsData = PlanetsIniData, action: ActionsUnion): PlanetsData {
  switch (action.type) {

    case ActionTypes.Initialize: return {...PlanetsIniData, state: 'iniDataRequested'}; // will be completed by ngrx Effect

    case ActionTypes.SaveIniData: return stateUpdatedWithPayload(state, action.payload);

    case ActionTypes.GetAll: return {...state, state: 'restOfDataRequested'}; // will be completed by ngrx Effect

    case ActionTypes.SaveAllData: return stateUpdatedWithPayload(state, action.payload);

    case ActionTypes.Reload: return {...PlanetsIniData, state: 'iniDataRequested'}; // will be completed by ngrx Effect

    case ActionTypes.ReportError: return {...state, state: action.payload};

    default: return state;
  }
}
