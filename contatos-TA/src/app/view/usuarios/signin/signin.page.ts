import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
  formLogar : FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private presentAlert: AlertService) {
    this.formLogar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl('')
    })
   }

  ngOnInit() {
    this.formLogar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  get errorControl(){
    return this.formLogar.controls;
  }

  submitForm() :boolean{
    if(!this.formLogar.valid){
      this.presentAlert.presentAlert("Erro", "Erro ao preencher o forumulatio")
      return false;
    }else{
      this.logar();
      return true
    }
  }
  private logar(){
    this.presentAlert.presentAlert("Olá", "Seja Bem vindo!")
    this.router.navigate(["home"]);
  }

  logarComGoogle(): void{}

  irParaSignUp(){
    this.router.navigate(["signup"])
  }

}
