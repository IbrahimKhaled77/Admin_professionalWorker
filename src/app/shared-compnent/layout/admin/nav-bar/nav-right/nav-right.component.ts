// Angular Import
import { Component} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomerByIdDto } from 'src/app/dtos/Customer/CustomerByIdDto';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent {
  // public props
  userId?:number;
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;

 
  input:CustomerByIdDto=new CustomerByIdDto();

  userIda =localStorage.getItem('UserId');
  ida=parseInt(this.userIda!);
  // constructor
  constructor(public backend:MainSericesService,private toastr:ToastrService,public spinner:NgxSpinnerService,private router:Router) {
    this.visibleUserList = false;
    this.chatMessage = false;
  }


  logout(){
    this.spinner.show()
  
    this.backend.Logout().subscribe(data=>{
      this.spinner.hide()
      localStorage.setItem('isLoggedIn','false');
      localStorage.removeItem('token');
       
  localStorage.removeItem('UserId');
   localStorage.removeItem('Email');
   localStorage.removeItem('UserType');
      
      this.toastr.success(`${data}`);
      this.router.navigate(['/Login']);
  
    },err=>{
      this.spinner.hide()
      this.toastr.error('Error Logout not ');
    });;

    
  }
  


  ngAfterViewInit(){
    this.spinner.show()
    if(this.ida !=undefined){
      this.backend.GetUserDetails(this.ida).subscribe(aa=>{
  
        this.spinner.hide()
        console.log(this.ida);
        this.input=aa;
       
  
      },err=>{
        this.spinner.hide()
    
  
      });
    }else{
  
      this.toastr.error('can not view User Id');
    }
  
  
   
  
  }
  


  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }
}
