import { Routes } from '@angular/router';
import { LoginComponent } from './core/authentification/login/login.component';
import { RegisterComponent } from './core/authentification/register/register.component';
import { DashbaordComponent } from './layouts/admin-layout/components/dashbaord/dashbaord.component';
import { UserboardComponent } from './layouts/user-layout/components/userboard/userboard.component';
import { OpboardComponent } from './layouts/operateur-layout/components/opboard/opboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'login', component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"admin",
  children: [
    {path: "", component:DashbaordComponent},
    // {path:"users"},
    // {path: "guichets"},
    // {path:"produits"},
    // {path:"files"},
    // {path: "avis"}
  ]},
   {path: "client",
  children:[
    {path: "", component:UserboardComponent},
    // {path:"produits"}
  ]},
  {path: "operateur",
  children:[
    {path: "", component:OpboardComponent}
  ]},
  //  {path:"operateur"}
];
