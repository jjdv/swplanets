import { Component, OnInit } from '@angular/core';

import { Planet, PlanetsData, planetsT } from 'src/app/services/planets/planets.config';
import { PlanetListService } from 'src/app/services/planet-list/planet-list.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss']
})
export class PlanetListComponent {
  constructor(private planets: PlanetListService) { }

  togglePageSize() {
    const newPageSize = this.planets.pageSize == 10 ? 20 : 10;
    this.planets.setPageSize(newPageSize);
  }
}
