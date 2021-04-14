import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {ControlBase} from '../../../shared/controls/control-base';
import {ApartmentService} from '../services/apartment.service';
import {Router} from '@angular/router';
import {TextboxControl} from '../../../shared/controls/textbox/control-textbox';
import {FormBuilder, FormGroup} from '@angular/forms';
import {first} from 'rxjs/operators';
import {Apartment} from '../model/apartment';
import {ControlService} from '../../../shared/controls/services/control.service';
import {GeocodeService} from '../../../shared/map/geocode.service';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {Role} from '../../../core/auth/model/user';
import {AccountService} from '../../accounts/services/account.service';
import {DropdownControl} from '../../../shared/controls/dropdown/control-dropdown';
import {Account} from '../../accounts/model/account';


@Component({
  selector: 'app-apartment-add-dialog',
  templateUrl: './apartment-add-dialog.component.html',
  styleUrls: ['./apartment-add-dialog.component.scss']
})
export class ApartmentAddDialogComponent implements OnInit {

  controls: ControlBase<any>[];
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ApartmentAddDialogComponent>,
    private apartmentService: ApartmentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private controlService: ControlService,
    private geocodeService: GeocodeService,
    private authenticationService: AuthenticationService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    this.controls = this.getControls();
    const realtorsControl = this.getRealtorsControl();
    this.controls.push(realtorsControl);
    this.form = this.formBuilder.group(this.controlService.controlsToValidOptions(this.controls));
    this.accountService.findAllRealtors().subscribe((realtors: Account[]) => {
        const options = [];
        realtors.forEach(realtor => options.push({key: realtor.id, value: `${realtor.firstName} ${realtor.lastName}`}));
        realtorsControl.options = options;
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  getCords($event): void {
    const location = this.form.controls.address.value.replace(/ /g, '+');
    this.geocodeService.geocodeAddress(location)
      .subscribe(
        (loc) => {
          this.setControlValue('lat', loc.lat);
          this.setControlValue('lng', loc.lng);
        },
        () => {
          this.f.address.setErrors({incorrect: 'Address not found'});
        }
      );
  }


  onSubmit(): void {
    this.form.markAllAsTouched();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    const apartment: Apartment = this.controlService.controlsToModelEntity(new Apartment(), this.controls);
    const role = this.authenticationService.role;
    const user = this.authenticationService.currentUser;
    if (role === Role.REALTOR) {
      apartment.realtorId = user.id;
    }
    this.apartmentService.createApartment(apartment)
      .pipe(first())
      .subscribe(
        data => {
          this.dialogRef.close();
          this.router.navigate([`/apartment/${data.id}`]);
        },
        error => {
          this.f.name.setErrors({incorrect: error});
        });
  }

  private getRealtorsControl(): ControlBase<any> {
    return new DropdownControl({
      key: 'realtorId',
      label: 'Realtor',
      options: [],
      order: 9,
      width: 350
    });
  }

  private setControlValue(key, value): void {
    const ctrl = this.controlService.findControlByKey(this.controls, key);
    ctrl.value = value;
  }

  private getControls(): ControlBase<any>[] {

    return [
      new TextboxControl({
        key: 'address',
        label: 'Address',
        placeholder: '',
        order: 1,
        width: 350,
        required: true
      }),
      new TextboxControl({
        key: 'lat',
        label: 'Latitude',
        placeholder: '',
        order: 2,
        width: 350,
      }),
      new TextboxControl({
        key: 'lng',
        label: 'Longitude',
        placeholder: '',
        order: 3,
        width: 350,
      }),
      new TextboxControl({
        key: 'name',
        label: 'Name',
        placeholder: 'Apartment Name',
        order: 4,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'description',
        label: 'Descriptiom',
        placeholder: 'description',
        order: 5,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'area',
        label: 'Floor area size',
        placeholder: 'Area in m2',
        type: 'number',
        order: 6,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'rooms',
        label: 'Nr of rooms',
        type: 'number',
        order: 7,
        width: 350,
        required: true
      }),

      new TextboxControl({
        key: 'price',
        label: 'Price per month',
        placeholder: 'Price in $',
        type: 'number',
        order: 8,
        width: 350,
        required: true
      }),

    ];
  }
}
