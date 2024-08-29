import { Component, Inject, input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { serviceCreateDto } from 'src/app/dtos/ServiceDto/ServiceCreateDTO';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { switchMap } from 'rxjs';





@Component({
  selector: 'app-create-service-dilog-component',
  standalone: true,
  imports: [MatIconModule, MatRadioModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, FormsModule, MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './create-service-dilog-component.component.html',
  styleUrl: './create-service-dilog-component.component.scss'
})



export class CreateServiceDilogComponentComponent {

  input: serviceCreateDto = new serviceCreateDto();
  attachement: File | undefined;


  quantityUnits: { value: number, viewValue: string }[] = [
    { value: 0, viewValue: 'Kilogram' },
    { value: 1, viewValue: 'Gram' },
    { value: 2, viewValue: 'Liter' },
    { value: 3, viewValue: 'Milliliter' },
    { value: 4, viewValue: 'Meter' },
    { value: 5, viewValue: 'Centimeter' },
    { value: 6, viewValue: 'Kilometer' },
    { value: 7, viewValue: 'Inch' },
    { value: 8, viewValue: 'Foot' },
    { value: 9, viewValue: 'Yard' },
    { value: 10, viewValue: 'Piece' },
  ];

  constructor(public dialogRef: MatDialogRef<CreateServiceDilogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: serviceCreateDto, private router: Router, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService

  ) {

  }

  SaveInfo() {



    if (this.input.categoryId == undefined) {
      this.toastr.warning('Title Is categoryId');
      return;

    } if (this.input.description == undefined || this.input.description == '') {
      this.toastr.warning('description Is Required');
      return;

    } if (this.input.discountPrice == undefined) {
      this.toastr.warning('discountPrice Is Required');
      return;

    }
    if (this.input.name == undefined || this.input.name == '') {
      this.toastr.warning('name Is Required');
      return;

    } if (this.input.price == undefined) {
      this.toastr.warning('price Is Required');
      return;

    }
    if (this.input.quantityUnit == undefined) {
      this.toastr.warning('quantityUnit Is Required');
      return;
    } if (this.input.isHaveDiscount == undefined) {
      this.toastr.warning('isHaveDiscount Is Required');
      return;

    }
    if (this.input.imagetitleservice == undefined || this.input.imagetitleservice == '') {
      this.toastr.warning('imagetitleservice Is Required');
      return;

    }

    let userId = localStorage.getItem('UserId');
    if (userId == null) {
      this.toastr.warning('Must Logged In As Client');
      return;


    } else {

      this.input.userId = parseInt(userId);


      if (this.attachement == undefined) {
        this.toastr.warning('Attachment Is default');
     
        this.executeCreateServices();
      } else {
     
        this.spinner.show();
        this.backend.UploadImageServicesProfileAndGetURL(this.attachement).pipe(
          switchMap((res: string) => {
            this.input.imagetitleservice = res;
            
            return this.backend.Createservice(this.input);
          })
        ).subscribe(
          src => {
            this.spinner.hide();
            this.toastr.success('Created Successfully');
            this.dialogRef.close();
          },
          err => {
            this.spinner.hide();
            this.toastr.error('Failed To Create Service');
          }
        );
      }
    }
  }

  executeCreateServices() {
    this.spinner.show();
    this.backend.Createservice(this.input).subscribe(
      src => {
        this.spinner.hide();
        this.toastr.success('Created Successfully');
        this.dialogRef.close();
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Failed To Create Category');
      }
    );
  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachement = event.target.files[0];
    }
  }


  setDiscount(value: boolean) {
    if (value != null || value != undefined) {
      this.input.isHaveDiscount = value;
    }

  }

  setDiscount2(value: boolean) {
    if (value != null || value != undefined) {
      this.input.isHaveDiscount = value;
    }

  }

  backService() {

    this.dialogRef.close();


  }





}
