import { Planet } from '../../services/get-planets/get-planets.config'

export interface PlanetDetailsEl {
    propertyName: string;
    value: string | number;
  }
  
export type PlanetDetails = PlanetDetailsEl[];
  

export function createPlanetDetails(planet: Planet | {}): PlanetDetails {
  if (!planet) return [];
  const excluded = ['name', 'created', 'edited', 'url'];
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
    case 'surface_water': return Number.isNaN(Number(val)) ? 'unknown' : val + '%';
    case 'residents': return Array.isArray(val) ? val.length : 'unknown';
    case 'films': return Array.isArray(val) ? val.length : 'unknown';
    case 'rotation_period': return Number.isNaN(Number(val)) ? 'unknown' : val + 'h';
    case 'orbital_period': return Number.isNaN(Number(val)) ? 'unknown' : val + ' days';
    case 'diameter': return Number.isNaN(Number(val)) ? 'unknown' : val + ' km';
    case 'gravity': return val.slice(0, -9) == '' || Number.isNaN(Number(val.slice(0, -9))) ? val : val.slice(0, -9) + ' x gravity of the Earth';
    case 'population': return Number.isInteger(val) ? Number(val).toLocaleString() : 'unknown';
    default: return val
  }
}
