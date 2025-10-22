import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(public keycloak: KeycloakService, private router: Router) { }

  showCreateRFQ(): boolean {
    if (!this.keycloak.isLoggedIn()) return true;
    return this.keycloak.getRoles().includes('Admin') || this.keycloak.getRoles().includes('Buyer');
  }

  showCreatePDS(): boolean {
    if (!this.keycloak.isLoggedIn()) return true;
    return this.keycloak.getRoles().includes('Admin') || this.keycloak.getRoles().includes('Seller');
  }

  login() {
    this.keycloak.login();
  }

  logout() {
    this.keycloak.logout();
  }

  goTo(path: string) {
    if (!this.keycloak.isLoggedIn()) {
      this.keycloak.login(window.location.origin + path);
    } else {
      this.router.navigate([path]);
    }
  }
  goToHome(path: string) {
    this.router.navigate([path]);
  }


}
