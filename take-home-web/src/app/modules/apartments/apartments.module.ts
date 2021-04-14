import {NgModule} from '@angular/core';
import {ApartmentsRoutingModule} from './apartments-routing.module';
import {SearchModule} from '../../shared/search/search.module';
import {InfoPageModule} from '../../shared/info-page/info-page.module';
import {CommonModule} from '@angular/common';
import {DialogModule} from '../../shared/dialog-form/dialog.module';
import {ControlModule} from '../../shared/controls/control.module';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {ApartmentListComponent} from './apartment-list/apartment-list.component';
import {ApartmentAddDialogComponent} from './apartment-add-dialog/apartment-add-dialog.component';
import {ApartmentDetailsComponent} from './apartment-details/apartment-details.component';
import {MapModule} from '../../shared/map/map.module';
import {ApartmentBrowserComponent} from './apartment-browser/apartment-browser.component';
import {ApartmentItemComponent} from './apartment-item/apartment-item.component';
import {ApartmentItemPanelComponent} from './apartment-item-panel/apartment-item-panel.component';
import {MatListModule} from '@angular/material/list';
import {MatControlsModule} from '../../shared/material/mat-controls.module';
import {ApartmentMiniSearchComponent} from './apartment-mini-search/apartment-mini-search.component';


@NgModule({
  declarations: [
    ApartmentListComponent,
    ApartmentDetailsComponent,
    ApartmentAddDialogComponent,
    ApartmentBrowserComponent,
    ApartmentItemComponent,
    ApartmentItemPanelComponent,
    ApartmentMiniSearchComponent],
  imports: [
    ApartmentsRoutingModule,
    SearchModule,
    InfoPageModule,
    CommonModule,
    DialogModule,
    ControlModule,
    MatButtonModule,
    ReactiveFormsModule,
    MapModule,
    MatListModule,
    MatControlsModule
  ]
})
export class ApartmentsModule {
}
