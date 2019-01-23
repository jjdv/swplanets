import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PlanetListService, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';
import { MapName, DetailedMapService } from '../../../services/detailed-map/detailed-map.service'
import { GalaxyMapService, Location } from '../../../services/galaxy-map/galaxy-map.service';
import { PlanetsTableState } from '../../../ngrx/planets-table/planets-table.reducer';
import { SavePageSize, SavePageNo } from 'src/app/ngrx/planets-table/planets-table.actions';

@Component({
  selector: 'planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('planetListTable') planetListTable: ElementRef;
  dataSource: MatTableDataSource<PlanetListEl>;
  freeze: boolean = false;
  zoomedLocation: Location | null = null;

  displayedColumns = ['name', 'location', 'detailedMap', 'details'];
  
  constructor(
    private planetListService: PlanetListService, private router: Router, private snackBar: MatSnackBar,
    private detailedMapService: DetailedMapService, private galaxyMapService: GalaxyMapService,
    private store$: Store<{planetsTable: PlanetsTableState}>
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
    this.galaxyMapService.zoomedLocation$.subscribe(zoomedLocation => {
      this.zoomedLocation = !zoomedLocation || typeof zoomedLocation === 'string' ? <Location | null>zoomedLocation : zoomedLocation.id
    })

    this.store$.pipe( select(state => state.planetsTable), first() ).subscribe(planetsTableState => {
      this.paginator.pageSize = planetsTableState.pageSize;
      this.paginator.pageIndex = planetsTableState.pageNo;
    });
  }

  updatePageData(pageData: PageEvent) {
    this.store$.dispatch(new SavePageSize(pageData.pageSize));
    if (pageData.pageIndex != pageData.previousPageIndex) this.store$.dispatch(new SavePageNo(pageData.pageIndex));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  selectMaps(location: string | null = null, detailedMap: string | null = null) {
    this.galaxyMapService.selectLocation(location);
    this.detailedMapService.selectMap(detailedMap);
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
    this.selectMaps(row.location, row.detailedMap);
    this.freeze = true;
  }

  selectOn(event: Event, row: PlanetListEl) {
    if (this.freeze) return;
    const tr = <Element>event.currentTarget;
    tr.classList.add('selected');
    this.selectMaps(row.location, row.detailedMap);
  }

  selectOff(event: Event) {
    if (this.freeze) return;
    const tr = <Element>event.currentTarget;
    tr.classList.remove('selected');
    this.selectMaps(null);
  }

  displayDetails(id: number) {
    if (Number.isInteger(id)) this.router.navigate([`/planet/${id}`]);
    else this.snackBar.open('No details available for this planet.', 'close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snack-bar', 'warning']
    });
  }
  
  displayDetailedMap(mapName: MapName): void { this.detailedMapService.openFullScreen(mapName); }
  
  toggleLocationZoom(location: Location): void {
    if (this.zoomedLocation && this.zoomedLocation != location) {
      setTimeout(() => this.galaxyMapService.toggleLocationZoom(location), 1400);
    }
    this.galaxyMapService.toggleLocationZoom(location);
  }
}
