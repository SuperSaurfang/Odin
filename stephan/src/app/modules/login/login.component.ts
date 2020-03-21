import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { faJedi } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services';
import { User } from 'src/app/core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private location: Location, 
    private activatedRoute: ActivatedRoute,
    private userService: UserService, 
    private formBuilder: FormBuilder,
    private router: Router) { }

  public placeHolder = faJedi;

  public loginForm = this.formBuilder.group({
    userMail: ['', [Validators.required, Validators.email]],
    userPassword: ['', Validators.required]
  });


  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params['logout'])
    if(this.activatedRoute.snapshot.params['logout']) {
      this.userService.logout();
    }
    this.userService.CurrentUser().subscribe(user => {
      if(user) {
        this.router.navigateByUrl("/");
      }
    })
  }

  login() {
    let user: User = this.loginForm.value;
    this.userService.login(user)
  }

  back() {
    this.location.back();
  }
}
