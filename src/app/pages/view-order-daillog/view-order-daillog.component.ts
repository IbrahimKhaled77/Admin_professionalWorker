import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { orderDtOById } from 'src/app/dtos/OrderDTO/OrderDTOByID';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainSericesService } from 'src/app/backend/main-serices.service';


@Component({
  selector: 'app-view-order-daillog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-order-daillog.component.html',
  styleUrl: './view-order-daillog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewOrderDaillogComponent {
  rate: number = 0;
  stars: number[] = [1, 2, 3, 4, 5]; 
  constructor(public dialogRef: MatDialogRef<ViewOrderDaillogComponent>, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: orderDtOById

  ) { }


  rateOrder(star: number) {
    this.rate = star;
  }

}
