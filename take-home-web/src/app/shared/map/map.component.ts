import {Component, ComponentFactoryResolver, Injector, Input, NgZone, OnInit} from '@angular/core';
import {DivIcon, FeatureGroup, latLng, LatLngBounds, Map, Marker, tileLayer} from 'leaflet';
import {EntityLocation} from './model/location';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private map: Map;
  leafletLayers;
  leafletFitBounds: LatLngBounds;


  options = {
    zoom: 10,
    center: latLng(52.1, 21.0),
    layers: [tileLayer(
      `${environment.mapbox_url}?access_token={accessToken}`, {
        attribution: '',
        maxZoom: 15,
        id: 'mapbox/streets-v11',
        accessToken: environment.mapbox_access_token
      })]
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private router: Router,
    private zone: NgZone
  ) {
  }

  @Input('locations')
  set locations(locations: EntityLocation[]) {
    if (locations !== undefined) {
      const markerArray = [];
      this.leafletLayers = [];
      locations.forEach((location) => {
        const mark = new Marker([location.lat, location.lng], {
          icon: new DivIcon({
            className: 'my-div-icon',
            html: `<div class="my-div-span">${location.mainText}</div>`
          })
        });
        markerArray.push(mark);
        mark.on('click', () => {
          this.zone.run(() => {
            this.router.navigateByUrl(`/apartment/${location.id}`);
          });
        });
        this.leafletLayers.push(mark);
      });
      const group = new FeatureGroup(markerArray);
      this.map.fitBounds(group.getBounds());
    }
  }

  ngOnInit(): void {
  }


  onMapReady(map: Map) {
    this.map = map;
  }
}
