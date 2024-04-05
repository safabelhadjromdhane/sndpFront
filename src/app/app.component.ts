import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from "./core/footer/footer/footer.component";
import { HeaderComponent } from "./core/header/header/header.component";
import { CardComponent } from "./shared/components/card/card.component";
import { TableComponent } from "./shared/components/table/table.component";
import { RegisterComponent } from "./core/authentification/register/register.component";
import { NotfoundPageComponent } from "./layouts/admin-layout/pages/notfound-page/notfound-page.component";
import { LoginComponent } from "./core/authentification/login/login.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, FooterComponent, HeaderComponent, CardComponent, TableComponent, RegisterComponent, NotfoundPageComponent, LoginComponent]
})
export class AppComponent implements  OnInit {
  ngOnInit(): void {
    initFlowbite();
  }
  title = 'sndpFront';
}
