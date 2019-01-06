import { Injectable } from '@angular/core';

const planetData: RegExp = new RegExp('^(.+)\s+([A-Z]\d{1,2})(, [IVX]{1,4})?$');

@Injectable({
  providedIn: 'root'
})
export class PlanetLocationService {

  constructor() { }
}
