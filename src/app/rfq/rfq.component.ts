import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rfq',
  templateUrl: './rfq.component.html',
  styleUrls: ['./rfq.component.css']
})
export class RFQComponent implements OnInit {

  constructor(private keycloak: KeycloakService, private router: Router) { }

  ngOnInit(): void {
  }
  submitRFQ(): void {
    if(this.keycloak.hasRole('RFQ-POST')) {
      alert('RFQ created');
    }
    else {
      this.router.navigate(['/forbidden']);
    }
  }

}
