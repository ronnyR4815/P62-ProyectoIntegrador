import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  userLoginOn: boolean = false;
  userAdmin: boolean = false;
  userData: any;

  constructor(private loginService: LoginService,
    private router: Router) {  }

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
        if (!userAdmin) {
          this.router.navigateByUrl('/inicio');
        }
      }
    })
    this.obtenerUsuarios();
  }
  obtenerUsuarios() {
    this.loginService.getUsuarios().subscribe(data => {
      this.userData = data;
      console.log(data);
    }, error => {
      console.log(error);
    })
  }
}
