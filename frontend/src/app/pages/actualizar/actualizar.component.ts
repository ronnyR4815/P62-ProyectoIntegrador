import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {
  currentUserData: User | undefined;

  // Variables para el formulario
  newUsername: string = '';
  newPassword: string = '';

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private loginService: LoginService,
    private formBuilder: FormBuilder,
    private router: Router) {
  }

  ngOnInit(): void {
    this.loginService.userData.subscribe(user => {
      if (user) {
        this.currentUserData = user;
      }
    });
  }

  updateUserData(): void {
    const updates: Partial<User> = {};
  
    if (this.newUsername && this.newUsername.trim() !== '') {
      updates.username = this.newUsername;
    }
  
    if (this.newPassword && this.newPassword.trim() !== '') {
      updates.password = this.newPassword;
    }
  
    this.loginService.updateUser(updates).subscribe(
      updatedUser => {
        console.log('Usuario actualizado:', updatedUser);
        console.log(updatedUser);
        this.router.navigateByUrl('/inicio');
        // Puedes hacer algo aquí después de la actualización, si es necesario
      },
      error => {
        console.error('Error al actualizar usuario:', error);
        // Manejo de errores si es necesario
      }
    );
  
    // Limpiar los campos del formulario después de la actualización
    this.newUsername = '';
    this.newPassword = '';
  }
}
