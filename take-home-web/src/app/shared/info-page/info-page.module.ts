import {NgModule} from '@angular/core';
import {InfoPageComponent} from './info-page/info-page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {InfoDetailsComponent} from './info-details/info-details.component';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {InfoGeneralContentComponent} from './info-general-content/info-general-content.component';
import {InfoActionsComponent} from './info-actions/info-actions.component';
import {MatControlsModule} from '../material/mat-controls.module';
import {ControlModule} from '../controls/control.module';


@NgModule({
  declarations: [
    InfoPageComponent,
    InfoDetailsComponent,
    InfoGeneralContentComponent,
    InfoActionsComponent
  ],
  imports: [
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatControlsModule,
    ControlModule
  ],
    exports: [
        InfoPageComponent,
        InfoDetailsComponent,
        InfoGeneralContentComponent,
        InfoActionsComponent
    ],
})
export class InfoPageModule {
}
