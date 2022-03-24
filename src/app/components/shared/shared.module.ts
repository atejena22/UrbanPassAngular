import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { ReactiveFormsModule } from '@angular/forms';

//Angular Material
//import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatPaginatorModule} from '@angular/material/paginator'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { NgChartsModule } from 'ng2-charts';



import {MatBadgeModule} from '@angular/material/badge'; 
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatSortModule} from '@angular/material/sort';

//import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination.module';
//import { NgxPaginationModule } from 'ngx-pagination/dist/ngx-pagination.module';
//import { NgxChartsModule } from '@swimlane/ngx-charts';
//import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    NgChartsModule,
    //NgxChartsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSortModule,

  //  NgxPaginationModule,
  ],
  exports:[
    NgChartsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatDividerModule,
    MatCardModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatProgressBarModule,
    MatSortModule,
    
  //  NgxPaginationModule,

  ]
})
export class SharedModule { }
