import { NgModule,APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { KeycloakService } from './keycloak.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RFQComponent } from './rfq/rfq.component';
import { PDSComponent } from './pds/pds.component';
import { ProductComponent } from './product/product.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'create-rfq', component: RFQComponent },
  { path: 'create-pds', component: PDSComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

function initializeKeycloak(keycloak: KeycloakService) {
  console.log('Initializing Keycloak...');
  return () => keycloak.init();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RFQComponent,
    PDSComponent,
    ProductComponent,
    ForbiddenComponent
  ],
  imports:[BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(routes)],
  providers: [{ provide: APP_INITIALIZER, useFactory: initializeKeycloak, deps: [KeycloakService], multi: true }],
  // providers: [KeycloakService],
  bootstrap: [AppComponent]
})
export class AppModule { }
