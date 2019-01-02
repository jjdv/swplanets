import { ApiData, PlanetsData } from './planets.config';

export function mergeApiPlanetsData(srcData: PlanetsData, addData: ApiData): PlanetsData {
    return {
        planetsNo: addData.count,
        nextUrl: addData.next,
        planets: srcData.planets.concat(addData.results),
        state: srcData.state
    };
}

export function apiDataOk(apiData: ApiData): boolean {
    const result = Boolean(apiData) && Number.isInteger(apiData.count) && Array.isArray(apiData.results) && apiData.results.length > 0;
    return result
}
