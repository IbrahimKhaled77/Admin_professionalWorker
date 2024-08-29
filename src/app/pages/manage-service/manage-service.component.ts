
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
import { CreateServiceDilogComponentComponent } from '../create-service-dilog-component/create-service-dilog-component.component';
import { EiditeServiceDilogComponentComponent } from '../eidite-service-dilog-component/eidite-service-dilog-component.component';
import { serviceUpdateDto } from 'src/app/dtos/ServiceDto/ServiceUpdateDTO';
import { serviceGetAllDto } from 'src/app/dtos/ServiceDto/ServiceGetAllDTO';
import { ViewServiceDilogComponent } from '../view-service-dilog/view-service-dilog.component';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-service',
  standalone: true,
  imports: [MatTooltipModule, MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule, MatTableModule, MatInputModule, MatPaginatorModule],
  templateUrl: './manage-service.component.html',
  styleUrl: './manage-service.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageServiceComponent {

  serviceGetAllDto: serviceGetAllDto[] = [];

  quantityUnits: string[] = ['Kilogram', 'Gram', 'Liter', 'Milliliter', 'Meter', 'Gram', 'Centimeter', 'Kilometer', 'Inch', 'Foot', 'Yard', 'Piece',];



  displayedColumns: string[] = ['serviceId', 'name', 'titleArabic', 'price', 'PriceAfterDiscount', 'providerUser', 'categoryId', 'userId', 'isActive', "Action"];
  dataSource: MatTableDataSource<serviceGetAllDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  constructor(public dialog: MatDialog, public backend: MainSericesService, private toastr: ToastrService, private router: Router, public spinner: NgxSpinnerService) {

    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();


  }

  ngOnInit() {

    this.spinner.show();

    this.backend.GetServiceAll().subscribe(data => {

   
      this.spinner.hide();
      this.serviceGetAllDto = data
      this.dataSource.data = this.serviceGetAllDto;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found service ");
      console.log(err);
      this.router.navigate(['/Login']);
    });





  }

  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  OnEditeService(item: serviceUpdateDto) {
    const dialog = this.dialog.open(EiditeServiceDilogComponentComponent, {
      width: '700px',
      data: item
    });

    dialog.afterClosed().subscribe(res => {

      this.spinner.show()
      this.backend.GetServiceAll().subscribe(data => {

       
        this.spinner.hide();
        this.serviceGetAllDto = data
        this.dataSource.data = this.serviceGetAllDto;


      }, err => {
        this.spinner.hide();
        this.toastr.error("Not Found service ");
        console.log(err);

      });






    });


  }


  onCreateService() {
    const createDialog = this.dialog.open(CreateServiceDilogComponentComponent, {
      width: '700px',

    });
    createDialog.afterClosed().subscribe((res) => {

      this.spinner.show();
      this.backend.GetServiceAll().subscribe(data => {

     
        this.spinner.hide();
        this.serviceGetAllDto = data
        this.dataSource.data = this.serviceGetAllDto;


      }, err => {
        this.spinner.hide();
        this.toastr.error("Not Found service ");
        console.log(err);

      });




    })

  }

  OnDeleteService(ServiceId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To delete this Service');

    const dialogDelete = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });


    dialogDelete.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show()
        this.backend.DeleteService(ServiceId).subscribe(data => {

          this.spinner.hide();

          this.toastr.success('deleted succefully')
          this.backend.GetServiceAll().subscribe(data => {

           
            this.spinner.hide();
            this.serviceGetAllDto = data
            this.dataSource.data = this.serviceGetAllDto;


          }, err => {
            this.spinner.hide();
            this.toastr.error("Not Found service ");
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





  OnviewService(id: number | undefined) {
    this.spinner.show()
    if (id != undefined) {
      this.backend.GetServiceDetails(id).subscribe(aa => {

        this.spinner.hide()
      
        this.toastr.success('view  success');
        this.dialog.open(ViewServiceDilogComponent, {
          width: '700px',
          data: aa,

        });

      }, err => {
        this.spinner.hide()
        this.toastr.error('can not GetServiceDetails');
        this.router.navigate(['/ManageServiceComponent'])

      });
    } else {

      this.toastr.error('can not view ServcieId');
    }




  }

}
