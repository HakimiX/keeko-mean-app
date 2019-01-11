import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

declare var M: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  reloadPage() {
    window.location.reload();
  }

  onLogoutClick() {
    this.authService.logout();
    M.toast({ id: 'logout', html: 'Goodbye!', classes: 'rounded' });
    this.router.navigate(['/login']);
    return false;
  }
}
