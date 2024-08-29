import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { LoginDto } from 'src/app/dtos/LoginDTO/LoginDTOs';

import { SharedModule } from 'src/app/theme/shared/shared.module';

import { jwtDecode } from 'jwt-decode';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {


  input: LoginDto = new LoginDto();

  constructor(private router: Router, public backend: MainSericesService, private toastr: ToastrService, public spinner: NgxSpinnerService) {


  }

  ngOnInit() {

    this.logout();

  }


  Login() {
    if (!this.input.UserName) {
      this.toastr.warning('Please enter a username');
      return;
    }

    if (!this.input.Password) {
      this.toastr.warning('Please enter a password');
      return;
    }

    this.spinner.show();
    this.backend.Login(this.input).subscribe(data => {
      this.spinner.hide();

      if (!data) {
        this.toastr.error('Login failed. No token received.');
        return;
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('token', data);

      let decodedToken: any;
      try {
        decodedToken = jwtDecode(data);
      } catch (error) {
        this.toastr.error('Invalid token.');
        return;
      }

      localStorage.setItem('UserId', decodedToken.UserId);
      localStorage.setItem('Email', decodedToken.Email);
      localStorage.setItem('UserType', decodedToken.UserType);

      this.toastr.success('Login success');
      this.router.navigate(['/Main']);
    }, err => {
      this.spinner.hide();
      this.toastr.error('Wrong username or password');
    });
  }



  NaivageteToRestpassword() {
    this.router.navigate(['/ResetPassword']);


  }


  logout() {
    this.spinner.show()

    this.backend.Logout().subscribe(data => {
      this.spinner.hide()
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('token');
      localStorage.removeItem('token');
       localStorage.removeItem('UserId');
       localStorage.removeItem('Email');
      localStorage.removeItem('UserType');

      this.toastr.success(`${data}`);
      this.router.navigate(['/Login']);

    }, err => {
      this.spinner.hide()
      this.toastr.error('Error Logout not ');
    });;


  }


}
