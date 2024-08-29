import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { orderGetAllDto } from 'src/app/dtos/OrderDTO/OrderDTOAll';
import { OnUpdateOrder } from 'src/app/dtos/OrderDTO/OrderUpdateDTO';
import { EditeOrderDillogComponent } from '../edite-order-dillog/edite-order-dillog.component';
import { ViewOrderDaillogComponent } from '../view-order-daillog/view-order-daillog.component';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-manage-order',
  standalone: true,
  imports: [MatTooltipModule, MatButtonModule, MatIconModule, MatTabsModule, MatTableModule, MatInputModule
    , MatPaginator, MatSort, MatPaginatorModule, MatDialogModule, CommonModule],
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageOrderComponent {

  orderGetAllDto: orderGetAllDto[] = [];


  status: string[] = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];










  displayedColumns: string[] = ['orderId', 'title', 'priceFinal2', 'dateOrder', 'rate', 'usersId', 'status', 'isactive', "Action"];
  dataSource: MatTableDataSource<orderGetAllDto>;
  dataSource2: MatTableDataSource<orderGetAllDto>;
  dataSource3: MatTableDataSource<orderGetAllDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource2.filter = filterValue.trim().toLowerCase();
    this.dataSource3.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
    if (this.dataSource3.paginator) {
      this.dataSource3.paginator.firstPage();
    }
  }
  constructor(public dialog: MatDialog, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService, private router: Router) {

    this.dataSource = new MatTableDataSource();
    this.dataSource2 = new MatTableDataSource();
    this.dataSource3 = new MatTableDataSource();
    this.sort = new MatSort();


  }

  io: any = null;

  ngOnInit() {

    this.spinner.show();

    this.backend.GetOrderAll(this.io).subscribe(data => {

      
      this.spinner.hide();
      this.orderGetAllDto = data
      this.dataSource.data = this.orderGetAllDto;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found Order ");
      console.log(err);
      this.router.navigate(['/Login']);
    });


    this.backend.GetOrderAll(false).subscribe(data => {

 
      this.spinner.hide();
      this.orderGetAllDto = data
      this.dataSource2.data = this.orderGetAllDto;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found service ");
      console.log(err);
      this.router.navigate(['/Login']);
    });

    this.backend.GetOrderAll(true).subscribe(data => {

     
      this.spinner.hide();
      this.orderGetAllDto = data
      this.dataSource3.data = this.orderGetAllDto;


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

  OnUpdateOrder(item: OnUpdateOrder) {
    const dialog = this.dialog.open(EditeOrderDillogComponent, {
      width: '700px',
      data: item
    });

    dialog.afterClosed().subscribe(res => {

      this.spinner.show()

      this.backend.GetOrderAll(true).subscribe(data => {

      
        this.spinner.hide();
        this.orderGetAllDto = data
        this.dataSource3.data = this.orderGetAllDto;


      }, err => {
        this.spinner.hide();
        this.toastr.error("Not Found service ");
        console.log(err);

      });






    });

  }


  OnAccepttOrder(OrderId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To Accept this Order');

    const daillog = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });

    daillog.afterClosed().subscribe(res => {

      this.spinner.show()
      this.backend.DeleteOrderR(OrderId, true).subscribe(data => {

        this.spinner.hide();
        this.backend.GetOrderAll(true).subscribe(data => {

      
          this.spinner.hide();
          this.orderGetAllDto = data
          this.dataSource3.data = this.orderGetAllDto;


        }, err => {
          this.spinner.hide();
          this.toastr.error("Not Found service ");
          console.log(err);

        });

        this.backend.GetOrderAll(this.io).subscribe(data => {

       
          this.spinner.hide();
          this.orderGetAllDto = data
          this.dataSource.data = this.orderGetAllDto;


        }, err => {
          this.spinner.hide();
          this.toastr.error("Not Found Order ");
          console.log(err);

        });

        this.toastr.success('deleted succefully')


      }, err => {
        this.spinner.hide()
        this.toastr.error('deleted failed')

      })




    });
  }


  OnDeleteOrder(OrderId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To delete this Order');

    const daillog = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });

    daillog.afterClosed().subscribe(res => {

      this.spinner.show()
      this.backend.DeleteOrder(OrderId).subscribe(data => {

        this.spinner.hide();
        this.backend.GetOrderAll(false).subscribe(data => {

          
          this.spinner.hide();
          this.orderGetAllDto = data
          this.dataSource2.data = this.orderGetAllDto;


        }, err => {
          this.spinner.hide();
          this.toastr.error("Not Found service ");
          console.log(err);

        });


        this.toastr.success('deleted succefully')


      }, err => {
        this.spinner.hide()
        this.toastr.error('deleted failed')

      })




    });



  }

  OnDeleteOrderR(OrderId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To delete this Order');

    const daillog = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });

    daillog.afterClosed().subscribe(res => {

      this.spinner.show()
      this.backend.DeleteOrderR(OrderId, false).subscribe(data => {

        this.spinner.hide();
        this.backend.GetOrderAll(false).subscribe(data => {

        
          this.spinner.hide();
          this.orderGetAllDto = data
          this.dataSource2.data = this.orderGetAllDto;


        }, err => {
          this.spinner.hide();
          this.toastr.error("Not Found service ");
          console.log(err);

        });

        this.backend.GetOrderAll(this.io).subscribe(data => {

     
          this.spinner.hide();
          this.orderGetAllDto = data
          this.dataSource.data = this.orderGetAllDto;


        }, err => {
          this.spinner.hide();
          this.toastr.error("Not Found Order ");
          console.log(err);

        });

        this.toastr.success('deleted succefully')


      }, err => {
        this.spinner.hide()
        this.toastr.error('deleted failed')

      })




    });





  }


  OnviewOrder(id: number | undefined) {
    this.spinner.show()
    if (id != undefined) {
      this.backend.GetOrderDetails(id).subscribe(aa => {

        this.spinner.hide()

        this.toastr.success('view  success');
        this.dialog.open(ViewOrderDaillogComponent, {
          width: '700px',
          data: aa,

        });

      }, err => {
        this.spinner.hide()
        this.toastr.error('can not GetOrderDetails');
 

      });
    } else {

      this.toastr.error('can not view Order(Id');
    }




  }




}
