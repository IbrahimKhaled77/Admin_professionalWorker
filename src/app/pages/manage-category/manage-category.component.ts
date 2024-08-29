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
import { categoryAllDto } from 'src/app/dtos/Category/CategoryAllDto/CategoryAllDto';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { EiditeCategoryDilogComponent } from '../eidite-category-dilog/eidite-category-dilog.component';
import { CongirmDialogDtos } from 'src/app/dtos/CongirmDialog/CongirmDialog';
import { CongirmDialogComponent } from 'src/app/shared-compnent/congirm-dialog/congirm-dialog.component';
import { CreateCategoryDilogComponent } from '../create-category-dilog/create-category-dilog.component';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ViewCategoryDaillogComponent } from '../view-category-daillog/view-category-daillog.component';


@Component({
  selector: 'app-manage-category',
  standalone: true,
  imports: [MatTooltipModule, MatDialogModule, MatButtonModule, MatIconModule, MatTabsModule, MatTableModule, MatInputModule, MatPaginatorModule],
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ManageCategoryComponent {

  categoryAll: categoryAllDto[] = [];

  displayedColumns: string[] = ['categoryId', 'title', 'description', 'titleArabic', 'descriptionArabic', 'isActive', 'Action'];
  dataSource: MatTableDataSource<categoryAllDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(new MatPaginatorIntl(), ChangeDetectorRef.prototype);
  @ViewChild(MatSort) sort: MatSort;


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  constructor(public dialog: MatDialog, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService) {

    this.dataSource = new MatTableDataSource();
    this.sort = new MatSort();


  }

  ngOnInit() {

    this.spinner.show();

    this.backend.GetCategoryAll().subscribe(data => {

  
      this.spinner.hide();
      this.categoryAll = data
      this.dataSource.data = this.categoryAll;


    }, err => {
      this.spinner.hide();
      this.toastr.error("Not Found Category ");
      console.log(err);

    });





  }


  ngAfterViewInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  OnEditeCategory(item: categoryAllDto) {
    const dialog = this.dialog.open(EiditeCategoryDilogComponent, {
      width: '700px',
      data: item
    });
    dialog.afterClosed().subscribe(res => {

      this.spinner.show()
      this.backend.GetCategoryAll().subscribe(data => {

        
        this.spinner.hide();
        this.categoryAll = data
        this.dataSource.data = this.categoryAll;


      }, err => {
        this.spinner.hide();
        this.toastr.error("Not Found Category ");
        console.log(err);

      });





    });
  }


  onCreateCategory() {




    const createDialog = this.dialog.open(CreateCategoryDilogComponent, {
      width: '700px',

    });
    createDialog.afterClosed().subscribe((res) => {

      this.spinner.show();
      this.backend.GetCategoryAll().subscribe(data => {

  
        this.spinner.hide();
        this.categoryAll = data
        this.dataSource.data = this.categoryAll;


      }, err => {
        this.spinner.hide();
        this.toastr.error("Not Found Category ");
        console.log(err);

      });



    })






  }

  OnDeleteCategory(CategoryId: number) {

    let item = new CongirmDialogDtos('Are you sure ?', 'Are you want To delete this Category');

    const dialogDelete = this.dialog.open(CongirmDialogComponent, {
      width: '500px',
      data: item
    });

    dialogDelete.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show()
        this.backend.DeleteCategory(CategoryId).subscribe(data => {

          this.spinner.hide();

          this.toastr.success('deleted succefully')
          this.backend.GetCategoryAll().subscribe(data => {

           
            this.spinner.hide();
            this.categoryAll = data
            this.dataSource.data = this.categoryAll;


          }, err => {
            this.spinner.hide();
            this.toastr.error("Not Found Category ");
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

  OnviewCategory(id: number | undefined) {
    this.spinner.show()
    if (id != undefined) {
      this.backend.GetCategoryDetails(id).subscribe(aa => {

        this.spinner.hide()
    
        this.toastr.success('view  success');
        this.dialog.open(ViewCategoryDaillogComponent, {
          width: '700px',
          data: aa,

        });

      }, err => {
        this.spinner.hide()
        this.toastr.error('can not GetCategoryDetails');
    

      });
    } else {

      this.toastr.error('can not view Category Id');
    }




  }


}
