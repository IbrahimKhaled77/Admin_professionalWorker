import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ErrorComponent {

  constructor(private router: Router) {


  }

clickhome(){

  this.router.navigate(['/Main']);
}



}
