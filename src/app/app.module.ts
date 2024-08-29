// Angular Import
import {NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './base-component/app.component';
import { NavBarComponent } from './shared-compnent/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './shared-compnent/layout/admin/navigation/navigation.component';
import { NavRightComponent } from './shared-compnent/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavContentComponent } from './shared-compnent/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './shared-compnent/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './shared-compnent/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './shared-compnent/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { AdminComponent } from './shared-compnent/layout/admin/admin.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [
    
    AppComponent,
    NavBarComponent,
    NavigationComponent,
    NavRightComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    AdminComponent,
    
   
  ],
  imports: [
    
    BrowserModule, 
    AppRoutingModule,
     SharedModule,
      FormsModule, 
      ReactiveFormsModule,
       BrowserAnimationsModule,
        ToastrModule.forRoot(),
         NgxSpinnerModule,
         MatTabsModule,
         MatIconModule,
         MatTableModule,
         MatButtonModule,
         MatInputModule,
         MatPaginatorModule,
         MatTooltipModule,
         MatDialogModule,
         MatRadioModule,
         MatSelectModule,
         ReactiveFormsModule,
         CommonModule,
         FormsModule,
         MatToolbarModule,
         
        
         
        ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
