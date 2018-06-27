import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
// import { DateRangeFilterPipe }     from './filter/date-range-filter.pipe';
// import { SearchDataFilterPipe }    from './filter/search-data.pipe';
// import { DateRangeFilterPayment }    from './filter/date-range-filter.pipe';
// import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MdInputModule,
  MdButtonModule,
  MdIconModule,
  MdSlideToggleModule }     from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule
  ],
  declarations: [
    // DateRangeFilterPipe,
    // SearchDataFilterPipe,
    // DateRangeFilterPayment,
    // ConfirmModalComponent
  ],
  exports: [
    // DateRangeFilterPipe,
    // SearchDataFilterPipe,
    // DateRangeFilterPayment,
    // ConfirmModalComponent
  ]
})
export class UtilModule { }
