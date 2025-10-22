import { Component } from '@angular/core';
import { KeycloakService } from './keycloak.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'keycloakAngular';
  constructor() {

  }
}
