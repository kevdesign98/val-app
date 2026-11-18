import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SupportBarComponent } from '../support-banner/support-banner.component';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink, SupportBarComponent],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {

}
