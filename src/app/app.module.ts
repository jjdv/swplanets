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

@NgModule({
  imports: [
    BrowserModule,
    StoreModule.forRoot({ planetData: planetsReducer }),
    EffectsModule.forRoot([PlanetsEffects]),
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    PlanetListComponent,
    PlanetDetailsComponent,
    NotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
