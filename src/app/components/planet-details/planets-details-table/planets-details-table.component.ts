import { Component, OnInit, Input } from '@angular/core';

import { PlanetDetails, createPlanetDetails } from '../planet-details.component.helpers'
import { PlanetListService } from 'src/app/services/planet-list/planet-list.service';

@Component({
  selector: 'planet-details-table',
  templateUrl: './planets-details-table.component.html',
  styleUrls: ['./planets-details-table.component.scss']
})
export class PlanetsDetailsTableComponent implements OnInit {
  @Input() id: number = 0;
  dataSource: PlanetDetails = [];
  displayedColumns = ['propertyName', 'value'];

  constructor(private planetListService: PlanetListService) {}

  ngOnInit() {
    this.getPlanetDetails()
  }

  private getPlanetDetails(): void {
    this.planetListService.details$.subscribe(pl => {
      const planet = (Array.isArray(pl) && pl[this.id]) ? pl[this.id] : {}
      this.dataSource = createPlanetDetails(planet)
    });
  }

}
