import { Component } from '@angular/core';

const MAPS_NAMES: Array<string> = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'];

interface mapEl {
  name: string;
  src: string;
}

@Component({
  selector: 'app-detailed-map',
  templateUrl: './detailed-map.component.html',
  styleUrls: ['./detailed-map.component.scss']
})
export class DetailedMapComponent {
  readonly maps: mapEl[] = MAPS_NAMES.map(mapName => ({
    name: mapName,
    src: `../../../../assets/${mapName}.jpg`
  }));
  
}
