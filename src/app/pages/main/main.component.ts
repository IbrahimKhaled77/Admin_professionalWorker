import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { CustomerAllDto } from 'src/app/dtos/Customer/CustomerAllDto';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ViewUserDaillogComponent } from '../view-user-daillog/view-user-daillog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MatIconModule, MatTabsModule, MatTableModule, MatInputModule, MatPaginatorModule, MatTooltipModule, MatDialogModule, MatButtonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})


export class MainComponent {



  customers: CustomerAllDto[] = [];


  displayedColumns: string[] = ['userId', 'firstName', 'lastName', 'email', 'gender', 'userType', 'isctive', 'Action'];
  dataSource: MatTableDataSource<CustomerAllDto>;

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

    this.backend.GetUserAll().subscribe(data => {

      
      this.spinner.hide();
      this.customers = data
      this.dataSource.data = this.customers;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found User ");
      console.log(err);
      this.router.navigate(['/Login']);

    });
  }




  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }



  OnviewUser(id: number | undefined) {
    this.spinner.show()
    if (id != undefined) {
      this.backend.GetUserDetails(id).subscribe(aa => {

        this.spinner.hide()
     
        this.toastr.success('view  success');
        this.dialog.open(ViewUserDaillogComponent, {
          width: '700px',
          data: aa,

        });

      }, err => {
        this.spinner.hide()
        this.toastr.error('can not GetUserDetails');
       

      });
    } else {

      this.toastr.error('can not view User Id');
    }




  }















  

  /*
    ngOnDestroy(){
      this.spinner.show()
    
      this.backend.Logout().subscribe(data=>{
        this.spinner.hide()
        localStorage.setItem('isLoggedIn','false');
        localStorage.removeItem('token');
        
        
      
    
      },err=>{
        this.spinner.hide()
        this.toastr.error('Error Logout not ');
      });;
  
  
  
    }
  */
}





