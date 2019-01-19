import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as merge, BehaviorSubject } from 'rxjs';

import { PlanetListService, PlanetList, PlanetListEl } from 'src/app/services/planet-list/planet-list.service';

export type sourceType = 'table' | 'observable'

/**
 * Data source for the PlanetsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class PlanetsTableDataSource extends DataSource<PlanetListEl> {
  readonly columns = ['name', 'knownPropsNo', 'residentsNo', 'filmsNo'];
  data: PlanetList;
  private readonly dataSubscriber;

  constructor(private planetList$: Observable<PlanetList>, public paginator: MatPaginator, private sort: MatSort) {
    super();
    this.dataSubscriber = this.planetList$.subscribe(list => this.data = list);
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<PlanetList> {
    return this.planetList$;/*
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.planetList$,
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => 
      //this.getPagedData(this.getSortedData(this.data))
      this.data
      ));*/
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.dataSubscriber.unsubscribe();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: PlanetList) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: PlanetList) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      const sortColDef = this.sort.active
      return compare(a[sortColDef], b[sortColDef], isAsc);
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  const cp = a < b ? -1 : (a > b ? 1 : 0);
  return  isAsc ? cp : - cp;
}
