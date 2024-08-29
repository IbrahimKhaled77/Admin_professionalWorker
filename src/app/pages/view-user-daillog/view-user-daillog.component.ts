import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { CustomerByIdDto } from 'src/app/dtos/Customer/CustomerByIdDto';

@Component({
  selector: 'app-view-user-daillog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-user-daillog.component.html',
  styleUrl: './view-user-daillog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewUserDaillogComponent {


  constructor(public dialogRef: MatDialogRef<ViewUserDaillogComponent>, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: CustomerByIdDto

  ) { }

}
