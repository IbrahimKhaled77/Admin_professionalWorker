import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoryCreateDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryCreateDtos';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule} from '@angular/forms';
import { switchMap } from 'rxjs';
@Component({
  selector: 'app-create-category-dilog',
  standalone: true,
  imports: [MatIconModule,FormsModule],
  templateUrl: './create-category-dilog.component.html',
  styleUrl: './create-category-dilog.component.scss'
})
export class CreateCategoryDilogComponent {

  attachement: File | undefined;
  input :categoryCreateDto= new categoryCreateDto();
 

  constructor(public dialogRef: MatDialogRef<CreateCategoryDilogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:categoryCreateDto,public backend:MainSericesService,private toastr:ToastrService,public spinner:NgxSpinnerService

 ) {}


 onFileSelected(event: any) {
  if (event.target.files && event.target.files[0]) {
    this.attachement = event.target.files[0];
  }
}

SaveInfo() {
  if (this.input.titlecategory == undefined || this.input.titlecategory == '') {
    this.toastr.warning('Title Is Required');
    return;
  }
  if (this.input.titlecategoryArabic == undefined || this.input.titlecategoryArabic == '') {
    this.toastr.warning('titlecategoryArabic Is Required');
    return;
  }
  if (this.input.description == undefined || this.input.description == '') {
    this.toastr.warning('Description Is Required');
    return;
  }
  if (this.input.descriptionArabic == undefined || this.input.descriptionArabic == '') {
    this.toastr.warning('descriptionArabic Is Required');
    return;
  }
  if (this.attachement == undefined) {
    this.toastr.warning('Attachment Is default');
    this.input.imageTitleCategory = '';
    this.executeCreateCategory();
  } else {

    this.spinner.show();
    this.backend.UploadImageCategoryProfileAndGetURL(this.attachement).pipe(
      switchMap((res: string) => {
        this.input.imageTitleCategory = res;
        
        return this.backend.CreateCategory(this.input);
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


executeCreateCategory() {
  this.spinner.show();
  this.backend.CreateCategory(this.input).subscribe(
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


backCategory(){

  this.dialogRef.close();

  
}




}
