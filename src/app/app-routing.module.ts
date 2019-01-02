import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetListComponent } from './components/planet-list/planet-list.component'
import { PlanetDetailsComponent } from './components/planet-details/planet-details.component'
import { NotFoundComponent } from './components/not-found/not-found.component'

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: PlanetListComponent },
  { path: 'planet/:id', component: PlanetDetailsComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
