import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/auth/register.service';
import { User } from 'src/app/services/auth/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerError: string = "";
  tipoOptions: string[] = ['ADMIN', 'OPERADOR'];

  registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    tipo: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) { }

  ngOnInit(): void {
  }

  get username() { return this.registerForm.controls.username; }
  get email() { return this.registerForm.controls.email; }
  get password() { return this.registerForm.controls.password; }
  get tipo() { return this.registerForm.controls.tipo; }

  register() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value as User).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.registerError = errorData;
        },
        complete: () => {
          console.info("Registro completo");
          this.router.navigateByUrl('/inicio');
          this.registerForm.reset();
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      alert("Error al ingresar datos");
    }
  }
}
