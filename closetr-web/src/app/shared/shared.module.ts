import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

//pipes
import { SearchFilterPipe } from '../pipes/search-filter.pipe';
import { DateRangeFilterPipe } from '../pipes/date-range-filter.pipe';

//ui-library
import { UiInputComponent } from './ui-input/ui-input.component';
import { UiTextButtonComponent } from './ui-text-button/ui-text-button.component';
import { UiInputSelectComponent } from './ui-input-select/ui-input-select.component';
import { UiInputAddButtonComponent } from './ui-input-add-button/ui-input-add-button.component';
import { UiInputAddTextComponent } from './ui-input-add-text/ui-input-add-text.component';
import { UiSelectAddButtonComponent } from './ui-select-add-button/ui-select-add-button.component';
import { UiBackButtonComponent } from './ui-back-button/ui-back-button.component';
import { UiEditButtonComponent } from './ui-edit-button/ui-edit-button.component';
import { UiCloseButtonComponent } from './ui-close-button/ui-close-button.component';
import { UiFilterSelectComponent } from './ui-filter-select/ui-filter-select.component';
import { UiTableComponent } from './ui-table/ui-table.component';
import { ClosetStatsWidgetComponent } from '../pages/page-partial/closet-stats-widget/closet-stats-widget.component';
import { UiFilterDateComponent } from './ui-filter-date/ui-filter-date.component';
import { UiPopupMenuItemComponent } from './ui-popup-menu-item/ui-popup-menu-item.component';
import { UiWidgetFullComponent } from './ui-widget-full/ui-widget-full.component';
import { UiIconSizedComponent } from './ui-icon-sized/ui-icon-sized.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UiInputComponent,
    UiTextButtonComponent,
    UiInputSelectComponent,
    UiInputAddButtonComponent,
    UiInputAddTextComponent,
    UiSelectAddButtonComponent,
    UiBackButtonComponent,
    UiEditButtonComponent,
    UiCloseButtonComponent,
    UiFilterSelectComponent,
    UiTableComponent,
    ClosetStatsWidgetComponent,
    UiFilterDateComponent,
    UiPopupMenuItemComponent,
    UiWidgetFullComponent,
    DateRangeFilterPipe,
    SearchFilterPipe,
    UiIconSizedComponent
  ],
  exports: [
    UiInputComponent,
    UiTextButtonComponent,
    UiInputSelectComponent,
    UiInputAddButtonComponent,
    UiInputAddTextComponent,
    UiSelectAddButtonComponent,
    UiBackButtonComponent,
    UiEditButtonComponent,
    UiCloseButtonComponent,
    UiFilterSelectComponent,
    UiTableComponent,
    ClosetStatsWidgetComponent,
    UiFilterDateComponent,
    UiPopupMenuItemComponent,
    UiWidgetFullComponent,
    DateRangeFilterPipe,
    SearchFilterPipe,
    UiIconSizedComponent
  ]
})
export class SharedModule { }
