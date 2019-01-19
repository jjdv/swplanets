export const planetsApiIniUrl: string = 'https://swapi.co/api/planets/?format=json';
export const planetsIniNo: number = 10;
export const retryNo: number = 0;

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  residents: string[];
  films: string[];
}

export interface ApiData {
  count?: number | null;
  next?: string | null;
  results?: Planet[];
}

export const apiIniData: ApiData = {
  count: null,
  next: null,
  results: []
}

export type planetsT = Planet[] | null;
export type planetsNoT = number | null;
export type nextUrlT = string | null | undefined;
export type stateT = 'initial' | 'iniDataRequested' | 'iniData' | 'restOfDataRequested' | 'allData' | 'apiError' | 'networkError';

export interface PlanetsData {
  planetsNo: planetsNoT;
  nextUrl: nextUrlT;
  planets: planetsT;
  state: stateT;
}

export const PlanetsIniData: PlanetsData = {
  planetsNo: null,
  nextUrl: 'https://swapi.co/api/planets/?format=json',
  planets: [],
  state: 'initial'
}
