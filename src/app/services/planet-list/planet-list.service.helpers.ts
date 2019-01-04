import { Planet } from '../planets/planets.config';
import { PlanetList } from './planet-list.service'


export function toPlanetList(planetArr: Planet[]): PlanetList {
    const planetList = [];
    planetArr.forEach((planet, index) => planetList.push({
      id: index,
      name: planet.name,
      knownPropsNo: 8 - Object.values(planet).filter(val => val == 'unknown').length,
      residentsNo: planet.residents.length,
      filmsNo: planet.films.length
    }));
    return planetList;
}
