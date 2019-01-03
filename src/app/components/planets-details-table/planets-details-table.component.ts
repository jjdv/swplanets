import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { PlanetsDetailsTableDataSource } from './planets-details-table-datasource';

@Component({
  selector: 'app-planets-details-table',
  templateUrl: './planets-details-table.component.html',
  styleUrls: ['./planets-details-table.component.scss']
})
export class PlanetsDetailsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: PlanetsDetailsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PlanetsDetailsTableDataSource(this.paginator, this.sort);
  }
}
