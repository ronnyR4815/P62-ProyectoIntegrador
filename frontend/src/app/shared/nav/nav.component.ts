import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userLoginOn: boolean = false;
  userAdmin: boolean = false;
  userRegisterOn: boolean = false;

  constructor(private loginService: LoginService,
    private registerService: RegisterService,
    private router: Router) { }

  // ngOnDestroy(): void {
  //   this.loginService.currentUserLoginOn.unsubscribe();
  // }

  ngOnInit(): void {
    // Se reinicia el login siempre en false
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
    this.loginService.currentAdmin.subscribe({
      next: (userAdmin) => {
        this.userAdmin = userAdmin;
        console.log(userAdmin);
      }
    })
    this.registerService.currentUserLoginOn.subscribe({
      next: (userRegisterOn) => {
        this.userRegisterOn = userRegisterOn;
      }
    })
  }

  logout() {
    this.loginService.logout().subscribe({
      next: () => {
        console.log("Sesión cerrada exitosamente.");
        this.router.navigateByUrl('/inicio');
      },
      error: (errorData) => {
        console.error("Error al cerrar la sesión:", errorData);
      }
    });
  }

}
