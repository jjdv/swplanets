import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { PlanetListService, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';
import { mapName, DetailedMapService } from '../../../services/detailed-map-highlight/detailed-map.service'

@Component({
  selector: 'planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlanetListEl>;

  displayedColumns = ['name', 'location', 'detailedMap', 'details'];
  
  constructor(private planetListService: PlanetListService, private router: Router, private snackBar: MatSnackBar, private detailedMapService: DetailedMapService) {}

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

  highlightOn(mapName: mapName) {
    this.detailedMapService.highlight(mapName);
  }

  highlightOff() {
    this.detailedMapService.highlight(null);
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
