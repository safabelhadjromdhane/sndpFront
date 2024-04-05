import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../core/header/header/header.component';
import { FooterComponent } from '../../../../core/footer/footer/footer.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
    selector: 'app-dashbaord',
    standalone: true,
    templateUrl: './dashbaord.component.html',
    styleUrl: './dashbaord.component.css',
    imports: [HeaderComponent, FooterComponent, TableComponent, CardComponent]
})
export class DashbaordComponent {

}
