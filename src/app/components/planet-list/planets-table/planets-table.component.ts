import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { PlanetListService, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';
import { mapName, DetailedMapService } from '../../../services/detailed-map-highlight/detailed-map.service'
import { GalaxyMapHighlightService } from '../../../services/galaxy-map-highlight/galaxy-map.service';

@Component({
  selector: 'planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlanetListEl>;
  freeze: Boolean = false;

  displayedColumns = ['name', 'location', 'detailedMap', 'details'];
  
  constructor(
    private planetListService: PlanetListService, private router: Router, private snackBar: MatSnackBar,
    private detailedMapService: DetailedMapService, private galaxyMapHighlight: GalaxyMapHighlightService
  ) {}

  filterPlanet(planet: PlanetListEl, filterStr: string) {
    return planet.name.toLowerCase().includes(filterStr.toLowerCase())
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.planetListService.list$.subscribe(list => {this.dataSource.data = list});
    this.sort.sortChange.subscribe(() => this.paginator.firstPage());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = this.filterPlanet;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  highlightMaps(location: string | null = null, detailedMap: string | null = null) {
    this.galaxyMapHighlight.setMap(location);
    this.detailedMapService.highlight(detailedMap);
  }

  highlightFreeze(event: Event, row: PlanetListEl) {
    const tr = <Element>event.currentTarget;
    if (this.freeze) {
      if (tr.classList.contains('selected')) {
        tr.classList.remove('selected');
        this.freeze = false;
        return;
      }
      tr.parentElement.getElementsByClassName('selected')[0].classList.remove('selected');
    }
    tr.classList.add('selected');
    this.highlightMaps(row.location, row.detailedMap);
    this.freeze = true;
  }

  highlightOn(event: Event, row: PlanetListEl) {
    if (this.freeze) return;
    const tr = <Element>event.currentTarget;
    tr.classList.add('selected');
    this.highlightMaps(row.location, row.detailedMap);
    //this.detailedMapService.highlight(row.detailedMap);
    //this.galaxyMapHighlight.setMap(row.location);
  }

  highlightOff(event: Event) {
    if (this.freeze) return;
    const tr = <Element>event.currentTarget;
    tr.classList.remove('selected');
    this.highlightMaps(null);
    //this.detailedMapService.highlight(null);
    //this.galaxyMapHighlight.setMap('');
  }

  displayDetails(id: number) {
    if (Number.isInteger(id)) this.router.navigate([`/planet/${id}`]);
    else this.snackBar.open('No details available for this planet.', 'close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snack-bar', 'warning']
    });
  }
  
  displayMap(mapName: mapName): void { this.detailedMapService.openFullScreen(mapName); }
  
  displayLocation(location: string): void {  }
}
