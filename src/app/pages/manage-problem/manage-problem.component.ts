import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { CongirmDialogDtos } from 'src/app/dtos/CongirmDialog/CongirmDialog';
import { CongirmDialogComponent } from 'src/app/shared-compnent/congirm-dialog/congirm-dialog.component';
import { GetProblemAllDto } from 'src/app/dtos/Problem/ProblemAllDto';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ViewProblemDaillogComponent } from '../view-problem-daillog/view-problem-daillog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-problem',
  standalone: true,
  imports: [MatTooltipModule, MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule, MatTableModule, MatInputModule, MatPaginatorModule],
  templateUrl: './manage-problem.component.html',
  styleUrl: './manage-problem.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageProblemComponent {

  problemAllDto: GetProblemAllDto[] = [];



  displayedColumns: string[] = ['problemId', 'title', 'purpose', 'userId', 'isActive', 'Action'];
  dataSource: MatTableDataSource<GetProblemAllDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(private router: Router, public dialog: MatDialog, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService) {

    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();


  }

  ngOnInit() {

    this.spinner.show();

    this.backend.GetProblemAll().subscribe(data => {

    
      this.spinner.hide();
      this.problemAllDto = data
      this.dataSource.data = this.problemAllDto;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found Problem ");
      console.log(err);
      this.router.navigate(['/Login']);
    });



  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }





  OnDeleteProblem(problemId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To delete this Problem');

    const dialog = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });

    dialog.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show()
        this.backend.DeleteProblem(problemId).subscribe(data => {

          this.spinner.hide();

          this.toastr.success('deleted succefully')
          this.backend.GetProblemAll().subscribe(data => {

          
            this.spinner.hide();
            this.problemAllDto = data
            this.dataSource.data = this.problemAllDto;


          }, err => {
            this.spinner.hide();
            this.toastr.error("Not Found Problem ");
            console.log(err);

          });


        }, err => {
          this.spinner.hide()
          this.toastr.error('deleted failed')

        })

      } else {

      }


    });

  }


  OnviewProblem(id: number | undefined) {
    this.spinner.show()
    if (id != undefined) {
      this.backend.GetProblemDetails(id).subscribe(aa => {

        this.spinner.hide()
    
        this.toastr.success('view  success');
        this.dialog.open(ViewProblemDaillogComponent, {
          width: '700px',
          data: aa,

        });

      }, err => {
        this.spinner.hide()
        this.toastr.error('can not GetOrderDetails');
        //this.router.navigate(['/ManageOrderComponent'])

      });
    } else {

      this.toastr.error('can not view Order Id');
    }




  }




}

