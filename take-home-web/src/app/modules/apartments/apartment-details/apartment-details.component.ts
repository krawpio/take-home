import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ApartmentService} from '../services/apartment.service';
import {Apartment} from '../model/apartment';
import {ControlBase} from '../../../shared/controls/control-base';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {ActionButton} from '../../../shared/search/actions/action-button';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {Role} from '../../../core/auth/model/user';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss']
})
export class ApartmentDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private apartmentService: ApartmentService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  apartment$: Observable<Apartment>;
  infoFields: ControlBase<any>[];
  updateUrl: string;
  actions: ActionButton<Apartment>[];
  editable: boolean;

  ngOnInit(): void {
    this.getApartment();
    const role = this.authenticationService.role;
    this.editable = [Role.ADMIN, Role.REALTOR].includes(role);
  }


  private getApartment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.updateUrl = `/apartments/${id}`;
    this.apartment$ = this.apartmentService.getApartment(id).pipe(
      tap(apartment => {
        this.infoFields = this.buildFields(apartment);
        this.actions = this.getActions(apartment);
      })
    );
  }
  private getActions(apartment: Apartment): ActionButton<Apartment>[] {
    const role = this.authenticationService.role;
    if (role === Role.CLIENT) {
      return [];
    } else {
      const lab = apartment.rentable ? 'Rent' : 'Restore';
      return [
        new ActionButton({
          label: lab,
          buttonType: 'flat',
          action: () => this.rent(apartment, !apartment.rentable)
        }),
        new ActionButton({
          label: lab,
          buttonType: 'flat',
          action: () => this.rent(apartment, !apartment.rentable)
        }),
        new ActionButton({
          label: lab,
          buttonType: 'flat',
          action: () => this.deleteAparment(apartment.id)
        }),
      ];
    }
  }

  private deleteAparment(id: number): void {
    this.apartmentService.delete(id).subscribe(
      () => this.router.navigateByUrl('/apartment')
    );
  }


  private rent(apartment: Apartment, value: boolean) {
    apartment.rentable = value;
    this.apartmentService.updateApartment(apartment).subscribe(
      () => this.getApartment()
    );
  }


  private buildFields(apartment: Apartment): ControlBase<any>[] {
      return [
        new TextboxControl({
          key: 'name',
          label: 'Name',
          value: apartment.name
        }),
        new TextboxControl({
          key: 'address',
          label: 'Address',
          value: apartment.address
        }),
        new TextboxControl({
          key: 'description',
          label: 'Descriptiom',
          value: apartment.description
        }),
        new TextboxControl({
          key: 'lat',
          label: 'Latitude',
          type: 'number',
          value: apartment.lat.toString()
        }),
        new TextboxControl({
          key: 'area',
          label: 'Floor area size',
          type: 'number',
          value: apartment.area.toString()
        }),
        new TextboxControl({
          key: 'lng',
          label: 'Longitude',
          type: 'number',
          value: apartment.lng.toString()
        }),

        new TextboxControl({
          key: 'rooms',
          label: 'Nr of rooms',
          type: 'number',
          value: apartment.rooms.toString()
        }),
        new TextboxControl({
          label: 'Status',
          type: 'string',
          value: apartment.rentable ?  'Free to rent' : 'Rented'
        }),
        new TextboxControl({
          key: 'price',
          label: 'Price per month',
          type: 'number',
          value: apartment.price.toString()
        }),
      ];
  }

}
