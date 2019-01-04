import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { PlanetListService, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';

@Component({
  selector: 'planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlanetListEl>;

  displayedColumns = ['name', 'knownPropsNo' , 'residentsNo', 'filmsNo'];
  
  constructor(private planetListService: PlanetListService, private router: Router) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.planetListService.list$.subscribe(list => {this.dataSource.data = list});
    this.sort.sortChange.subscribe(() => this.paginator.firstPage());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = filterPlanet;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  displayDetails(id: number) {
    this.router.navigate([`/planet/${id}`]);
  }
}

const filterPlanet = (planet: PlanetListEl, filterStr: string) => planet.name.toLowerCase().includes(filterStr.toLowerCase())