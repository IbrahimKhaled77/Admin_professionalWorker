import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { categoryByIdDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryByIdDto';

@Component({
  selector: 'app-view-category-daillog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-category-daillog.component.html',
  styleUrl: './view-category-daillog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewCategoryDaillogComponent {

  constructor(public dialogRef: MatDialogRef<ViewCategoryDaillogComponent>,  public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: categoryByIdDto

  ) { }

}
