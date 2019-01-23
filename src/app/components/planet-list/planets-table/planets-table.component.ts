import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { PlanetListService, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';
import { MapName, DetailedMapService } from '../../../services/detailed-map/detailed-map.service'
import { GalaxyMapService, Location } from '../../../services/galaxy-map/galaxy-map.service';
import { PlanetsTableState } from '../../../ngrx/planets-table/planets-table.reducer';
import { SavePageSize, SavePageNo } from 'src/app/ngrx/planets-table/planets-table.actions';

interface TrSelect {
  freeze: string;
  hover: string;
}

function filterPlanet(planet: PlanetListEl, filterStr: string) {
  return planet.name.toLowerCase().includes(filterStr.toLowerCase())
}

@Component({
  selector: 'planets-table',
  templateUrl: './planets-table.component.html',
  styleUrls: ['./planets-table.component.scss']
})
export class PlanetsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<PlanetListEl>;
  trSelect: TrSelect = {
    freeze: null,
    hover: null
  };
  zoomedLocation: Location | null = null;

  displayedColumns = ['name', 'location', 'detailedMap', 'details'];
  
  constructor(
    private planetListService: PlanetListService, private router: Router, private snackBar: MatSnackBar,
    private detailedMapService: DetailedMapService, private galaxyMapService: GalaxyMapService,
    private store$: Store<{planetsTable: PlanetsTableState}>
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.planetListService.list$.subscribe(list => {this.dataSource.data = list});
    this.sort.sortChange.subscribe(() => this.paginator.firstPage());
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = filterPlanet;
    this.galaxyMapService.zoomedLocation$.subscribe(zoomedLocation => {
      this.zoomedLocation = !zoomedLocation || typeof zoomedLocation === 'string' ? <Location | null>zoomedLocation : zoomedLocation.id
    })

    this.store$.pipe( select(state => state.planetsTable), first() ).subscribe(planetsTableState => {
      this.paginator.pageSize = planetsTableState.pageSize;
      this.paginator.pageIndex = planetsTableState.pageNo;
    });
  }

  selected(row: PlanetListEl): boolean {
    const rowId = row.name + row.location;
    return rowId == this.trSelect.freeze || rowId == this.trSelect.hover;
  }

  updatePageData(pageData: PageEvent) {
    this.store$.dispatch(new SavePageSize(pageData.pageSize));
    if (pageData.pageIndex != pageData.previousPageIndex) this.store$.dispatch(new SavePageNo(pageData.pageIndex));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
    this.dataSource.paginator.firstPage();
  }

  selectMaps(row: PlanetListEl | null = null) {
    const location = row ? row.location : null;
    const detailedMap = row ? row.detailedMap : null;
    this.galaxyMapService.selectLocation(location);
    this.detailedMapService.selectMap(detailedMap);
  }

  highlightFreeze(row: PlanetListEl) {
    const rowId = row.name + row.location;
    if (rowId == this.trSelect.freeze) this.trSelect.freeze = null;
    else {
      this.trSelect.freeze = rowId;
      this.trSelect.hover = null;
    }
    this.selectMaps(row);
  }

  selectOn(row: PlanetListEl) {
    if (this.trSelect.freeze) return;
    this.trSelect.hover = row.name + row.location;
    this.selectMaps(row);
  }

  selectOff() {
    if (this.trSelect.freeze) return;
    this.trSelect.hover = null;
    this.selectMaps();
  }

  displayDetails(id: number): void {
    if (Number.isInteger(id)) this.router.navigate([`/planet/${id}`]);
    else this.snackBar.open('No details available for this planet.', 'close', {
      duration: 3000,
      verticalPosition: 'top',
      panelClass: ['snack-bar', 'warning']
    });
  }
  
  displayDetailedMap(event: Event, mapName: MapName): void {
    event.stopPropagation();
    this.detailedMapService.openFullScreen(mapName);
  }
  
  toggleLocationZoom(event: Event, location: Location): void {
    event.stopPropagation();
    if (this.zoomedLocation && this.zoomedLocation != location) {
      setTimeout(() => this.galaxyMapService.toggleLocationZoom(location), 1400);
    }
    this.galaxyMapService.toggleLocationZoom(location);
  }
}
