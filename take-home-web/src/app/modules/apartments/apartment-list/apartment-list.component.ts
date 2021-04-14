import {Component, OnInit, ViewChild} from '@angular/core';
import {ControlBase} from '../../../shared/controls/control-base';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {Apartment} from '../model/apartment';
import {ApartmentService} from '../services/apartment.service';
import {SearchComponent} from '../../../shared/search/search.component';
import {MatDialog} from '@angular/material/dialog';
import {ApartmentAddDialogComponent} from '../apartment-add-dialog/apartment-add-dialog.component';
import {SliderControl} from '../../../shared/controls/slider/control-slider';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {

  dataUrl = '/apartments/findByFilter';
  modelType = Apartment;
  title = 'Apartments';
  filters: ControlBase<any>[] = [];
  actions: ActionButton<Apartment>[];
  filtersStyle = 'grid-column4';

  @ViewChild(SearchComponent, {static: true}) search: SearchComponent<Apartment>;


  constructor(
    private apartmentService: ApartmentService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.apartmentService.findAll()
      .subscribe((apartments) => {
        this.filters = this.getFilters(apartments);
      });
    this.actions = this.getActions();
  }


  private getFilters(apartments: Apartment[]): ControlBase<any>[] {
    const maxArea = this.max(apartments.map(apartment => apartment.area));
    const maxPrice = this.max(apartments.map(apartment => apartment.price));
    const maxRooms = this.max(apartments.map(apartment => apartment.rooms));
    return [
      new SliderControl({
        key: 'area',
        label: 'Apartment Area',
        order: 1,
        width: 510,
        toRange: maxArea
      }),
      new SliderControl({
        key: 'price',
        label: 'Price per month',
        order: 1,
        width: 510,
        toRange: maxPrice
      }),
      new SliderControl({
        key: 'rooms',
        label: 'Nr of rooms',
        order: 1,
        width: 510,
        toRange: maxRooms
      }),
    ];
  }

  private getActions(): ActionButton<Apartment>[] {
    return [
      new ActionButton({
        label: 'Create Apartment',
        buttonType: 'flat',
        isContext: false,
        action: () => this.createAccount()
      })
    ];
  }

  private createAccount(): void {
    this.dialog.open(ApartmentAddDialogComponent, {
      width: '544px',
      height: '900px'
    });
  }

  private max(array) {
    return Math.max(...array);
  }
}
