import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { GetProblemAllByIdDto } from 'src/app/dtos/Problem/ProblemByIdDTO';

@Component({
  selector: 'app-view-problem-daillog',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-problem-daillog.component.html',
  styleUrl: './view-problem-daillog.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ViewProblemDaillogComponent {

  constructor(public dialogRef: MatDialogRef<ViewProblemDaillogComponent>,  public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: GetProblemAllByIdDto

  ) { }



}
