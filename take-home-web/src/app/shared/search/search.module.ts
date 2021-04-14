import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule, DecimalPipe} from '@angular/common';
import {GridTableComponent} from './grid-table/grid-table.component';
import {ExpandedFiltersPanelComponent} from './filters/expanded-filters-panel/expanded-filters-panel.component';
import {SearchComponent} from './search.component';
import {ReactiveFormsModule} from '@angular/forms';

import {MatControlsModule} from '../material/mat-controls.module';
import {GridCellComponent} from './grid-table/grid-cell/grid-cell.component';
import {FilterButtonComponent} from './filters/filter-button/filter-button.component';
import {ActionPanelComponent} from './actions/action-panel/action-panel.component';
import {TabGridComponent} from './tab-grid/tab-grid.component';
import {FilterTabButtonComponent} from './filters/filter-tab-button/filter-tab-button.component';
import {ExpansionGridComponent} from './expansion-grid/expansion-grid.component';
import {ControlModule} from '../controls/control.module';


@NgModule({
  declarations: [
    GridTableComponent,
    ExpandedFiltersPanelComponent,
    SearchComponent,
    GridCellComponent,
    FilterButtonComponent,
    ActionPanelComponent,
    TabGridComponent,
    FilterTabButtonComponent,
    ExpansionGridComponent,
    ExpansionGridComponent
  ],
  imports: [
    ControlModule,
    RouterModule,
    MatControlsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    GridTableComponent, ExpandedFiltersPanelComponent, SearchComponent, TabGridComponent, ExpansionGridComponent
  ],
  providers: [
    DecimalPipe
  ]
})
export class SearchModule {
}
