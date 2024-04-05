import { Routes } from '@angular/router';
import { LoginComponent } from './core/authentification/login/login.component';
import { RegisterComponent } from './core/authentification/register/register.component';
import { DashbaordComponent } from './layouts/admin-layout/components/dashbaord/dashbaord.component';
import { UserboardComponent } from './layouts/user-layout/components/userboard/userboard.component';
import { OpboardComponent } from './layouts/operateur-layout/components/opboard/opboard.component';
import { BureauListComponent } from './shared/components/bureau-list/bureau-list.component';
import { ProduitListComponent } from './shared/components/produit-list/produit-list.component';
import { ClProfileComponent } from './layouts/user-layout/pages/cl-profile/cl-profile.component';
import { OpProfileComponent } from './layouts/operateur-layout/pages/op-profile/op-profile.component';

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
    {path:"bureau", component:BureauListComponent},
    {path: "produit", component:ProduitListComponent},
    {path:"profile", component:ClProfileComponent}
  ]},
  {path: "operateur",
  children:[
    {path: "", component:OpboardComponent},
    {path:"profile", component:OpProfileComponent}
  ]},
  //  {path:"operateur"}
];
