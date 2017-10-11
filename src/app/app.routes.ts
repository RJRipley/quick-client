import { ModuleWithProviders } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Home } from "./private/home/home.component";
import { Landing } from "./public/landing/landing.component";

// Public
import { ChangePassword } from './public/change-password/change-password.component';
import { Confirm } from "./public/confirm/confirm.component";
import { ForgotPassword } from "./public/forgot-password/forgot-password.component";
import { Login } from "./public/login/login.component";
import { Register } from "./public/register/register.component";
import { Resend } from "./public/resend/resend.component";
import { Verification } from "./public/verification/verification.component";

// Private
import { View } from "./private/view/view.component";
import { Logout } from "./private/logout/logout.component";

const publicRoutes:Routes = [
  {
    path:'',
    redirectTo:'/landing',
    pathMatch:'full'
  },
  {
    path:'landing',
    component:Landing,
    children: [
      { path:'changePassword/:email', component:ChangePassword },
      { path:'confirm/:email', component:Confirm },
      { path:'forgotPassword', component:ForgotPassword },
      { path:'login', component:Login },
      { path:'register', component:Register },
      { path:'resend/:email', component:Resend },
      { path:'verification/:email', component:Verification },
      { path:'', component:Login }
    ]
  },
];

const privateRoutes:Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home', 
    component:Home, 
    children: [
      { path:'logout', component:Logout },
      { path:'view', component:View },
      { path:'', component:View }      
    ]
  }
];

const routes:Routes = [
  {
    path:'',
    children: [
      ...publicRoutes,
      ...privateRoutes,
      {
        path:'',
        component: Landing
      }
    ]
  },
];

export const appRoutingProviders:any[] = [];

export const AppRoutingModule:ModuleWithProviders = RouterModule.forRoot(routes, { useHash:true });
