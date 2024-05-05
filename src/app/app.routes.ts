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
import { NotfoundPageComponent } from './layouts/admin-layout/pages/notfound-page/notfound-page.component';
import { ForgotPaswordComponent } from './core/authentification/forgot-pasword/forgot-pasword.component';
import { BureauComponent } from './layouts/admin-layout/pages/bureau/bureau.component';
import { FeedbacksComponent } from './layouts/admin-layout/pages/feedbacks/feedbacks.component';
import { AddBureauComponent } from './layouts/admin-layout/pages/add-bureau/add-bureau.component';
import { EditBureauComponent } from './layouts/admin-layout/pages/edit-bureau/edit-bureau.component';
import { TicketListComponent } from './shared/components/ticket-list/ticket-list.component';
import { AddFeedbackComponent } from './layouts/user-layout/components/add-feedback/add-feedback.component';
import { EditUserComponent } from './shared/components/edit-user/edit-user.component';
import { EditProfilComponent } from './layouts/user-layout/components/edit-profil/edit-profil.component';
import { EditAvisComponent } from './layouts/user-layout/components/edit-avis/edit-avis.component';
import { GuichetListComponent } from './shared/components/guichet-list/guichet-list.component';
import { FileListComponent } from './shared/components/file-list/file-list.component';
import { EditGuichetComponent } from './layouts/admin-layout/pages/edit-guichet/edit-guichet.component';
import { AddGuichetComponent } from './layouts/admin-layout/pages/add-guichet/add-guichet.component';
import { AddProduitComponent } from './layouts/admin-layout/pages/add-produit/add-produit.component';
import { BureauDetailsComponent } from './layouts/user-layout/components/bureau-details/bureau-details.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'login', component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"forgot-password", component: ForgotPaswordComponent},

  {path:"admin",
  children: [
    {path: "", component:DashbaordComponent},
    {path:"guichets", component:GuichetListComponent},
    {path:'files', component:FileListComponent},
    {path:"tickets", component:TicketListComponent},
    {path:"edit-user/:id", component: EditUserComponent},
    {path:"bureaux", component:BureauComponent,
    //  children: [{path:"add-bureau", component:AddBureauComponent},
    //   {path:"edit-bureau", component:EditBureauComponent}
    //  ]
    },
    {path:"bureaux/add-bureau", component:AddBureauComponent},
    {path:"bureaux/edit-bureau/:id", component:EditBureauComponent},
    {path: "produits", component:ProduitListComponent},
    {path: "avis", component:FeedbacksComponent},
    {path:"edit-guichet/:id", component:EditGuichetComponent},
    {path:"guichets/add-guichet", component:AddGuichetComponent},
    {path:"produits/add-produit", component:AddProduitComponent},

  ]},
   {path: "client",
  children:[
    {path: "", component:UserboardComponent},
    {path:"bureau", component:BureauListComponent},
    {path: "produit", component:ProduitListComponent},
    {path:"avis", component:ClProfileComponent},
    {path:"avis/add-feedback", component:AddFeedbackComponent},
    {path:'edit-profile', component:EditProfilComponent},
    {path:"avis/edit-avis/:id", component:EditAvisComponent},
    {path:"bureau-details/:id", component:BureauDetailsComponent}
  ]},
  {path: "operateur",
  children:[
    {path: "", component:OpboardComponent},
    {path:"profile", component:OpProfileComponent,},
    ]},
  {path:'**', component:NotfoundPageComponent},
];
