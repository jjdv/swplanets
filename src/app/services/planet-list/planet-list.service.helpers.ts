import { Planet } from '../planets/planets.config';
import { PlanetList, PlanetListProp, SortOrder } from './planet-list.service'


export function toPlanetList(planetArr: Planet[]): PlanetList {
    const planetList = [];
    planetArr.forEach(planet => planetList.push({
      name: planet.name,
      knownPropsNo: 8 - Object.values(planet).filter(val => val == 'unknown').length,
      residentsNo: planet.residents.length,
      filmsNo: planet.films.length
    }));
    return planetList;
}

type SortCompare = 0 | 1 | -1;

function sortCompare(a: any, b: any): SortCompare {
    if (typeof a === 'string') a = a.toLowerCase();
    if (typeof b === 'string') b = b.toLowerCase();

    return a < b ? -1 : (a > b ? 1 : 0)
}

function sortComparePropOrder(prop: PlanetListProp, sortOrder: SortOrder) {
    return function(a: any, b: any) {
        const propInt = prop;
        const sc = sortCompare(a[propInt], b[propInt]);

        return sortOrder === 'asc' ? sc : - sc;
    }
}

export function sortPlanetList(planetList: PlanetList, sortProp: PlanetListProp, sortOrder: SortOrder): void {
    planetList.sort(sortComparePropOrder(sortProp, sortOrder))
}

export function getPage(listArr: any[], pageNo: number, pageSize: number): any[] {
        const start = pageNo * pageSize;
        const end =  (pageNo + 1) * pageSize;
        return listArr.slice(start, end)
}
