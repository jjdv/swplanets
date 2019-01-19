import { Planet } from '../get-planets/get-planets.config';

export type PlanetLocations = string;
export type PlanetLocationsArr = Array<string>;
export interface PlanetLocationEl {
  name: string;
  location: string;
  detailedMap: string | null;
}
export type PlanetListFromLocations = PlanetLocationEl[];

export interface PlanetListEl extends PlanetLocationEl {
  id: number | null;
  details: string;
}
export type PlanetList = PlanetListEl[];

export function toPlanetListFromLocations(planetLocations: PlanetLocations) {
  const planetDataRgx: RegExp = /^(.+)\s+([A-Z]\d{1,2})(?:,\s*([IVX]{1,4}))?$/;
  const planetLocationsArr: PlanetLocationsArr = planetLocations.replace('\r', '').split('\n');

  const planetList: PlanetLocationEl[] = [];
  let match: Array<string> | null, map: string | undefined;
  for (let planetData of planetLocationsArr) {
    match = planetData.match(planetDataRgx);
    if (!match || match.length < 3) continue;
    map = match[3];
    if (typeof map !== 'string' || map === '') map = '-';
    planetList.push({
      name: match[1],
      location: match[2],
      detailedMap: map
    });
  }
  return planetList;
}

function nameMatch(name1: string, name2: string) {
  const name2FirstWord = name2.match(/^\w+\b/)[0].toLowerCase();
  return name1.toLowerCase().startsWith(name2FirstWord);
}

export function toPlanetList(planetListFromLocations: PlanetListFromLocations, planetDetailsArr: Planet[]): PlanetList {
    const planetList = [];
    let index: number, planet: Planet;
    let knownPropsNo: number, residents: number, films: number;
    let details: number | string;
    for (let planetListEl of planetListFromLocations) {
      index = planetDetailsArr.findIndex(planet => nameMatch(planet.name, planetListEl.name));
      if (index === -1) {
        planetList.push({
          ...planetListEl,
          id: null,
          details: 0,
        })
      } else {
        planet = planetDetailsArr[index];
        knownPropsNo = 8 - Object.values(planet).filter(val => val == 'unknown').length
        residents = Array.isArray(planet.residents) && planet.residents.length > 0 ? 1 : 0;
        films = Array.isArray(planet.films) && planet.films.length > 0 ? 1 : 0;
        details = knownPropsNo + residents + films;
        //details = details > 0 ? details.toString() : '-';
        planetList.push({
          ...planetListEl,
          id: index,
          details: details// + ' prop.'
        })
      }
    };
    return planetList;
}
