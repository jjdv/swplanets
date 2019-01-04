import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent {
  id: number = 0;
  displayedColumns = ['name', 'knownPropsNo' , 'residentsNo', 'filmsNo'];
  
  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  back(): void { this.location.back(); }
}
