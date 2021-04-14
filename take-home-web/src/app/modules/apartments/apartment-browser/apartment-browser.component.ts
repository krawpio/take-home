import {Component, OnInit, ViewChild} from '@angular/core';
import {ApartmentService} from '../services/apartment.service';
import {Apartment} from '../model/apartment';
import {ControlBase} from '../../../shared/controls/control-base';
import {SliderControl} from '../../../shared/controls/slider/control-slider';
import {HttpParams} from '@angular/common/http';
import {ApartmentMiniSearchComponent} from '../apartment-mini-search/apartment-mini-search.component';

@Component({
  selector: 'app-apartment-browser',
  templateUrl: './apartment-browser.component.html',
  styleUrls: ['./apartment-browser.component.css']
})
export class ApartmentBrowserComponent implements OnInit {

  constructor(private apartmentService: ApartmentService) {
  }

  apartments: Apartment[];
  filters: ControlBase<any>[] = [];
  @ViewChild(ApartmentMiniSearchComponent, {static: true}) searchComponent: ApartmentMiniSearchComponent;

  private static getFilters(apartments: Apartment[]): ControlBase<any>[] {
    const maxArea = Math.max(...(apartments.map(apartment => apartment.area)));
    const maxPrice = Math.max(...(apartments.map(apartment => apartment.price)));
    const maxRooms = Math.max(...(apartments.map(apartment => apartment.rooms)));
    return [
      new SliderControl({
        key: 'area',
        label: 'Floor area size',
        order: 1,
        width: 350,
        toRange: maxArea
      }),
      new SliderControl({
        key: 'price',
        label: 'Price per month',
        order: 2,
        width: 350,
        toRange: maxPrice
      }),
      new SliderControl({
        key: 'rooms',
        label: 'Nr of rooms',
        order: 3,
        width: 350,
        toRange: maxRooms
      }),
    ];
  }

  ngOnInit(): void {
    this.search();
  }

  submit() {
    let httpParams = new HttpParams();

    this.filters.forEach(c => {
        if (c.value != null) {
          httpParams = httpParams.set(c.key, c.value);
        }
        if (c.toValue != null) {
          httpParams = httpParams.set(`${c.key}_high`, c.toValue);
        }
      }
    );

    this.searchByParams(httpParams);
  }

  searchByParams(params: HttpParams) {
    this.apartmentService.findByQuery(params)
      .subscribe((apartments) => {
        this.apartments = apartments;
        this.searchComponent.toggle();
      });
  }

  search() {
    this.apartmentService.findAll()
      .subscribe((apartments) => {
        this.apartments = apartments;
        this.filters = ApartmentBrowserComponent.getFilters(apartments);
      });
  }


}
