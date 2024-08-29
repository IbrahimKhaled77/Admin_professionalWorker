import { Component} from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router } from '@angular/router';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResetPasswordDto } from 'src/app/dtos/ResetPassword/ResetPasswordDTO';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {


  private resetPassword = localStorage.getItem('Email')!;
  private resetPasswordGet = this.resetPassword;


  input: ResetPasswordDto = new ResetPasswordDto();

  constructor(public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService, private router: Router) {


  }




  EiditePassword() {

    if (this.input.UserName == undefined || this.input.UserName == '') {
      this.toastr.warning('plase Enter User name');
      return;

    }

    if (this.input.newPassword == undefined || this.input.newPassword == '') {
      this.toastr.warning('plase Enter New Password');
      return;
    }

    if (this.input.UserName != this.resetPasswordGet) {
      this.toastr.warning('Email Invalid ');
      return;

    }


    this.spinner.show()
    this.backend.ResetPassword(this.input).subscribe(src => {

      this.spinner.hide()
      this.toastr.success(' Reset Password Successfully')
      this.router.navigate(['/Login']);

    }, err => {

      this.spinner.hide()
      this.toastr.error('Failed To Reset Password')

    }
    )



  }


  NaivageteToLogin() {

    this.router.navigate(['Login']);
  }




}
