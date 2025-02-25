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
import { EditProduitComponent } from './layouts/admin-layout/pages/edit-produit/edit-produit.component';
import { AddUserComponent } from './shared/components/add-user/add-user.component';
import { ProfileComponent } from './layouts/admin-layout/pages/profile/profile.component';
import { TicketsComponent } from './layouts/user-layout/components/tickets/tickets.component';
import { EditTicketComponent } from './layouts/operateur-layout/components/edit-ticket/edit-ticket.component';
import { EditFileComponent } from './layouts/operateur-layout/components/edit-file/edit-file.component';
import { FileEnCoursComponent } from './layouts/operateur-layout/pages/file-en-cours/file-en-cours.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path:'login', component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"forgot-password/:id", component: ForgotPaswordComponent},

  {path:"admin",
  children: [
    {path: "", component:DashbaordComponent},
    {path:"guichets", component:GuichetListComponent},
    {path:'files', component:FileListComponent},
    {path:"tickets", component:TicketListComponent},
    {path:"edit-user/:id", component: EditUserComponent},
    {path:"add-user", component:AddUserComponent},
    {path:'profile',component:ProfileComponent},
    {path:"bureaux", component:BureauComponent},
    {path:"bureaux/add-bureau", component:AddBureauComponent},
    {path:"bureaux/edit-bureau/:id", component:EditBureauComponent},
    {path: "produits", component:ProduitListComponent},
    {path: "avis", component:FeedbacksComponent},
    {path:"edit-guichet/:id", component:EditGuichetComponent},
    {path:"guichets/add-guichet", component:AddGuichetComponent},
    {path:"guichets/edit-guichet/:id", component:EditGuichetComponent},
    {path:"produits/add-produit", component:AddProduitComponent},
    {path:"produits/edit-produit/:id", component:EditProduitComponent}


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
    {path:"bureau-details/:id", component:BureauDetailsComponent},
    {path:"tickets", component:TicketsComponent},
    // {path:"tickets/reserve-ticket", component:AddTicketComponent}
  ]},
  {path: "operateur",
  children:[
    {path: "", component:OpboardComponent},
    {path:"edit-ticket/:id", component:EditTicketComponent},
    {path:"edit-file/:id", component:EditFileComponent},
    {path:"tickets", component:FileEnCoursComponent}
    // {path:"",}
    // {path:"profile", component:OpProfileComponent,},
    ]},
  {path:'**', component:NotfoundPageComponent},
];
