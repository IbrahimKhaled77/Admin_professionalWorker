import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,  MatDialogRef} from '@angular/material/dialog';
import { CongirmDialogDtos } from 'src/app/dtos/CongirmDialog/CongirmDialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
@Component({
  selector: 'app-congirm-dialog',
  standalone: true,
  imports: [MatTooltipModule,MatIconModule,MatButtonModule,MatTabsModule,MatTableModule,MatInputModule],
  templateUrl: './congirm-dialog.component.html',
  styleUrl: './congirm-dialog.component.scss'
})
export class CongirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<CongirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA)public data:CongirmDialogDtos

 ) {}



 ClickNo(){

  this.dialogRef.close(false)

 }


 ClickYes(){

  this.dialogRef.close(true)
 }


}
