import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  constructor(private userService: UserService) { }

  public isAuthenticated = false;

  ngOnInit() {
    this.userService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }

}
