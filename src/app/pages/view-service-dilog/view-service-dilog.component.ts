import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { serviceGetByIdDto } from 'src/app/dtos/ServiceDto/ServiceGetbyIdDTO';

import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainSericesService } from 'src/app/backend/main-serices.service';

@Component({
  selector: 'app-view-service-dilog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-service-dilog.component.html',
  styleUrl: './view-service-dilog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class ViewServiceDilogComponent {

  quantityUnit: string[] = ['Kilogram', 'Gram', 'Liter', 'Milliliter', 'Meter', 'Gram', 'Centimeter', 'Kilometer', 'Inch', 'Foot', 'Yard', 'Piece',];


  constructor(public dialogRef: MatDialogRef<ViewServiceDilogComponent>, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: serviceGetByIdDto

  ) { }



}







