import {NgModule} from '@angular/core';
import {MapComponent} from './map.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {CommonModule} from '@angular/common';
import {GeocodeService} from './geocode.service';


@NgModule({
  declarations: [MapComponent],
  imports: [
    LeafletModule,
    CommonModule
  ],
  exports: [
    MapComponent
  ],
  providers: [
    GeocodeService
  ]
})
export class MapModule {
}
