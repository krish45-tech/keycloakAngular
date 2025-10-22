import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloak: Keycloak;
  public authenticated = false;
  public roles: string[] = [];

  constructor() {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080',
      realm: 'Demo',
      clientId: 'outputs'
    });
   }
      // onLoad: 'login-required',
      // checkLoginIframe: false,
            // redirectUri: window.location.origin,
      // checkLoginIframe: true,
      // flow: 'standard'
  public async init(): Promise<void> {
    console.log('Initializing Keycloak...');
    return this.keycloak.init({
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      checkLoginIframe: true,
      checkLoginIframeInterval: 5000, // optional, default is 10 seconds
      pkceMethod: 'S256',
      // silentCheckSsoFallback: false, // optional, disables redirect fallback
      redirectUri: window.location.origin,
      flow: 'standard'
    }).then(authenticated => {
        console.log(authenticated);
        this.authenticated = authenticated;
        if (authenticated) {
          this.roles = this.keycloak.tokenParsed?.realm_access?.roles || [];
          // this.scheduleRefresh();
        }
    }).catch(error => {
      console.error('Keycloak initialization failed', error)
    });
  }

  login(redirectUri?: string): void {
    console.log('Logging in...',window.location.href);
    this.keycloak.login(
      {
        redirectUri: redirectUri || window.location.href
      }
    );
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }

  isLoggedIn(): boolean {
    return this.authenticated;
  }

  getRoles(): string[] {
    return this.roles;
  }
  hasRole(role: string,resource?:string): boolean {
    return this.keycloak.hasResourceRole(role);
  }
  getUsername(): string {
    return this.keycloak.tokenParsed?.['given_name'] || this.keycloak.tokenParsed?.['preferred_username'] || '';
  }

  private scheduleRefresh(): void {
    setInterval(() => {
      this.keycloak.updateToken(30).catch(() => this.keycloak.login());
    }, 10000);
  }
}

