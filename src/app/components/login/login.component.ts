import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ServiceloginService } from './servicelogin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  objetoLogueado: any

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private service: ServiceloginService) {
    if (this.service.usuarioData) {
      this.router.navigate(['/']);
    }

    this.form = this.fb.group({
      userName: [''],
      password: ['']
    })

  }

  ngOnInit(): void {
  }


  ingresar() {
    this.service.login(this.form.value).subscribe(user => {
      console.log(user);
      if (user.exito === 1) {
        this.router.navigate(['/dashboard']);
        this._snackBar.open(user.mensaje,"", { duration: 2500 });
      }else if(user.exito===0 || user.exito===3){
        this._snackBar.open(user.mensaje,"", { duration: 2500 });
      }

    }, error => {
      this._snackBar.open('Error de Conexión'+error, "", { duration: 2500 });
    })


  }




}
