
import { Component } from '@angular/core';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';

import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-nav-bar-shared',
  standalone: true,
  imports: [MatToolbarModule,MatIconModule,MatButtonModule],
  templateUrl: './nav-bar-shared.component.html',
  styleUrl: './nav-bar-shared.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})



export class NavBarSharedComponent {


 
    // constructor
    constructor(

    ) {
  
    }
  
   

  
}
