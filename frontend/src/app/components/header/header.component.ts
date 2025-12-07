import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent  implements OnInit {

  constructor(
    private router: Router
  ) { }

  isLoginPage: boolean = this.router.url === '/login';

  ngOnInit() {}

  redirect(path: string) {
    console.log('Navigating to:', path);
    this.router.navigate([path]);
  }

}
