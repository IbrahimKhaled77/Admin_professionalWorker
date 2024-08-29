import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location, LocationStrategy } from '@angular/common';
import { MainSericesService } from 'src/app/backend/main-serices.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showAdminLayout: boolean = true;
  navCollapsed!: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;

  constructor(
    private router: Router,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private backend: MainSericesService,
    private spinner: NgxSpinnerService
  ) {
    this.windowWidth = window.innerWidth;
    this.navCollapsedMob = false;
  }

  ngOnInit() {
    // التحقق من الـ route الحالي لتحديد ما إذا كنا نعرض واجهة الإدارة
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        const currentRoute = evt.urlAfterRedirects;
        this.showAdminLayout = !(currentRoute === '/' || currentRoute.startsWith('/Login') || currentRoute.startsWith('/ResetPassword'));

        // تحقق من حالة تسجيل الدخول هنا
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (!isLoggedIn && !currentRoute.startsWith('/Login')) {
          this.router.navigate(['/Login']);
        }
      }
    });

    // تمرير التنقل لتعيين موقع التمرير إلى الأعلى
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

   
  
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.windowWidth = event.target.innerWidth;
    if (this.windowWidth < 992) {
      document.querySelector('.pcoded-navbar')?.classList.add('menupos-static');
      if (document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('navbar-collapsed')) {
        document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('navbar-collapsed');
      }
    }
  }

  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.closeMenu();
    }
  }

  closeMenu() {
    if (document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
      document.querySelector('app-navigation.pcoded-navbar')?.classList.remove('mob-open');
    }
  }

  


}
