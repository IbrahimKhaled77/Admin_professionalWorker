import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { categoryUpdateDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryUpdateDto';
import { MatIconModule } from '@angular/material/icon';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { categoryAllDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryAllDto';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-eidite-category-dilog',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './eidite-category-dilog.component.html',
  styleUrl: './eidite-category-dilog.component.scss'
})
export class EiditeCategoryDilogComponent {

  input: categoryUpdateDto = new categoryUpdateDto();
  attachement: File | undefined;

  constructor(public dialogRef: MatDialogRef<EiditeCategoryDilogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: categoryAllDto, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService

  ) { }


  EiditeCategory() {





    this.input.categoryId = this.data.categoryId;
    this.input.description = this.data.description;
    this.input.title = this.data.title;
    this.input.imageTitleCategory = this.data.imageTitleCategory;
    this.input.descriptionArabic = this.data.descriptionArabic;
    this.input.titlecategoryArabic = this.data.titleArabic;

    if (this.attachement == undefined) {
      this.toastr.warning('Attachment Is default');
      this.input.imageTitleCategory = this.input.imageTitleCategory;
      this.executeUpdateCategory();
    } else {

      this.spinner.show();
      this.backend.UploadImageServicesProfileAndGetURL(this.attachement).pipe(
        switchMap((res: string) => {
          this.input.imageTitleCategory = res;
          return this.backend.UpdateCategory(this.input);
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



  executeUpdateCategory() {
    this.spinner.show();
    this.backend.UpdateCategory(this.input).subscribe(
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


  GoHome() {
    this.dialogRef.close();

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.attachement = event.target.files[0];
    }
  }
}
