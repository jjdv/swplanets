import { Planet } from '../../services/get-planets/get-planets.config'

export interface PlanetDetailsEl {
    propertyName: string;
    value: string | number;
  }
  
export type PlanetDetails = PlanetDetailsEl[];
  

export function createPlanetDetails(planet: Planet | {}): PlanetDetails {
  if (!planet) return [];
  const excluded = ['created', 'edited', 'url'];
  const planetDetails: PlanetDetails = [];

  for (let prop in planet) {
    if (excluded.includes(prop)) continue;
    planetDetails.push({
      propertyName: propToName(prop),
      value: propValToValue(prop, planet[prop])
    })
  }
  return planetDetails;
}

function propToName(prop: string): string {
  return prop.slice(0, 1).toUpperCase() + prop.slice(1).replace('_', ' ');
}

function propValToValue(prop, val) {
  switch (prop) {
    case 'surface_water': return val + '%';
    case 'residents': return val.length;
    case 'films': return val.length;
    case 'rotation_period': return val + 'h';
    case 'orbital_period': return val + ' days';
    case 'diameter': return val + ' km';
    case 'gravity': return val.slice(0, -8) + 'x gravity of Earth';
    case 'population': return Number(val).toLocaleString();
    default: return val
  }
}
