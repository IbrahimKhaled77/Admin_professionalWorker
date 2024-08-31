import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnUpdateOrder } from 'src/app/dtos/OrderDTO/OrderUpdateDTO';
import { Router } from '@angular/router';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { orderGetAllDto } from 'src/app/dtos/OrderDTO/OrderDTOAll';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edite-order-dillog',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatRadioModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edite-order-dillog.component.html',
  styleUrl: './edite-order-dillog.component.scss'
})
export class EditeOrderDillogComponent {


  input: OnUpdateOrder = new OnUpdateOrder();

  orderStatuses: { value: number, viewValue: string }[] = [
    { value: 0, viewValue: 'Pending' },
    { value: 1, viewValue: 'Shipped' },
    { value: 2, viewValue: 'Delivered' },
    { value: 3, viewValue: 'Cancelled' }
  ];

  constructor(public dialogRef: MatDialogRef<EditeOrderDillogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: orderGetAllDto, private router: Router, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService

  ) { }


  EiditeOrder() {



    this.input.orderId = this.data.orderId;
    this.input.status=this.data.status;

 
    this.spinner.show()
    this.backend.UpdateOrder(this.input).subscribe(src => {

      this.spinner.hide()
      
      this.toastr.success('Update Order Successfully')
      this.dialogRef.close();

    }, err => {

      this.spinner.hide()
      this.toastr.error('Failed To Update Order')

    }
    )



  }

  GoOrder() {
    this.dialogRef.close();

  }

  getStatusColor(status: number): string {
    switch (status) {
      case 0:
        return 'gray';
      case 2:
        return 'rgb(30, 203, 105)';
      case 3:
        return 'rgb(220, 7, 7)';
      default:
        return 'blue';
    }
  }


}
