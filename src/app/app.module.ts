import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { planetsReducer } from './ngrx/planets/planets.reducer';
import { PlanetsEffects } from './ngrx/planets/planets.effects';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetListComponent } from './components/planet-list/planet-list.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetsTableComponent } from './components/planets-table/planets-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PlanetsDetailsTableComponent } from './components/planets-details-table/planets-details-table.component';

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ planetsData: planetsReducer }),
    EffectsModule.forRoot([PlanetsEffects]),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
    NotFoundComponent,
    PlanetsTableComponent,
    PlanetsDetailsTableComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
