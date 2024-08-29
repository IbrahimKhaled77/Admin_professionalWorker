import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { serviceUpdateDto } from 'src/app/dtos/ServiceDto/ServiceUpdateDTO';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { serviceGetByIdDto } from 'src/app/dtos/ServiceDto/ServiceGetbyIdDTO';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-eidite-service-dilog-component',
  standalone: true,
  imports: [MatIconModule, MatRadioModule, MatInputModule, MatSelectModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './eidite-service-dilog-component.component.html',
  styleUrl: './eidite-service-dilog-component.component.scss'
})
export class EiditeServiceDilogComponentComponent {


  input: serviceUpdateDto = new serviceUpdateDto();

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


  constructor(public dialogRef: MatDialogRef<EiditeServiceDilogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: serviceGetByIdDto, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService

  ) { }

  EiditeService() {

    this.input.serviceId = this.data.serviceId;
    this.input.name = this.data.name;
    this.input.discountPrice = this.data.discountPrice;
    this.input.discountType = this.data.discountType;
    this.input.imagetitleservice = this.data.image;
    this.input.price = this.data.price;
    this.input.isHaveDiscount = this.data.isHaveDiscount;
    this.input.description = this.data.description;
    this.input.quantityUnit = this.data.quantityUnit;


    if (this.attachement == undefined) {
      this.toastr.warning('Attachment Is default');
      this.input.imagetitleservice = this.input.imagetitleservice;
      this.executeUpdateServices();
    } else {

      this.spinner.show();
      this.backend.UploadImageServicesProfileAndGetURL(this.attachement).pipe(
        switchMap((res: string) => {
          this.input.imagetitleservice = res;
          return this.backend.UpdateService(this.input);
        })
      ).subscribe(
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




  }

  executeUpdateServices() {
    this.spinner.show();
    this.backend.UpdateService(this.input).subscribe(
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


  GoService() {
    this.dialogRef.close();

  }


  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachement = event.target.files[0];
    }
  }

}
