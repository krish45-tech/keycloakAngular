import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pds',
  templateUrl: './pds.component.html',
  styleUrls: ['./pds.component.css']
})
export class PDSComponent implements OnInit {

  constructor(private keycloak: KeycloakService, private router: Router) { }

  ngOnInit(): void {
  }
  submitPDS(): void {
    if(this.keycloak.hasRole('PDS-POST')) {
      alert('Product created');
    }
    else {
      this.router.navigate(['/forbidden']);
    }
  }

}
