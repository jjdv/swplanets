import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './modules/material-module';

import { planetsReducer } from './ngrx/planets/planets.reducer';
import { PlanetsEffects } from './ngrx/planets/planets.effects';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppComponent } from './components/app.component';
import { PlanetListComponent } from './components/planet-list/planet-list.component';
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanetsTableComponent } from './components/planet-list/planets-table/planets-table.component';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PlanetsDetailsTableComponent } from './components/planet-details/planets-details-table/planets-details-table.component';
import { MapComponent } from './components/planet-list/map/map.component';
import { DetailedMapComponent } from './components/planet-list/detailed-map/detailed-map.component';

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
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
    NotFoundComponent,
    PlanetsTableComponent,
    PlanetsDetailsTableComponent,
    MapComponent,
    DetailedMapComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
