
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ManageCategoryComponent } from './pages/manage-category/manage-category.component';
import { ManageServiceComponent } from './pages/manage-service/manage-service.component';
import { ManageOrderComponent } from './pages/manage-order/manage-order.component';
import { ErrorComponent } from './pages/error/error.component';
import { ManageProblemComponent } from './pages/manage-problem/manage-problem.component';
import { NavBarSharedComponent } from './shared-compnent/nav-bar-shared/nav-bar-shared.component';
import { NavComponent } from './shared-compnent/nav/nav.component';


const routes: Routes = [
 


  { 

    path:'',
    component:LoginComponent 

  },
  { 

    path:'Login',
    component:LoginComponent 

  },
  { 

    path:'ResetPassword',
    component:ResetPasswordComponent
  },  
  { 

    path:'Main',
    component:MainComponent

  },
  { 

    path:'ManageCategory',
    component:ManageCategoryComponent

  },
  { 

    path:'NavComponent',
    component:NavComponent

  },
  { 

    path:'NavBarShared',
    component:NavBarSharedComponent

  },
  { 

    path:'ManageService',
    component:ManageServiceComponent

  },
  { 

    path:'ManageOrder',
    component:ManageOrderComponent

  },
  { 

    path:'ManageProblem',
    component:ManageProblemComponent

  },
  { 

    path:'Error',
    component:ErrorComponent

  },
  { 

    path:'**',
    component:ErrorComponent

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
