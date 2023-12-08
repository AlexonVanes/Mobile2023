import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/common/alert.service';
import { AuthService } from 'src/app/model/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  formCadastrar : FormGroup;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private presentAlert: AlertService) {
    this.formCadastrar = new FormGroup({
      email: new FormControl(''),
      senha: new FormControl(''),
      confSenha: new FormControl('')
    })
   }

   ngOnInit() {
    this.formCadastrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confSenha: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  submitForm() :boolean{
    if(!this.formCadastrar.valid){
      this.presentAlert.presentAlert("Erro", "Erro ao preencher o forumulario")
      return false;
    }else{
      if(this.formCadastrar.value['senha'] != this.formCadastrar.value['confSenha']){
        this.presentAlert.presentAlert("Erro", "As senhas nao conferem")
        return false
      }
      this.cadastrar();
      return true
    }
  }

  private cadastrar(){
    this.authService.signUpWithEmailAndPassword(this.formCadastrar.value['email'],
    this.formCadastrar.value['senha']).then((res)=>{
      this.presentAlert.presentAlert("Cadastro", "Cadastro realizado com sucesso")
      this.router.navigate(["signin"]);
    }).catch((error)=>{
      this.presentAlert.presentAlert("Cadastro", "Erro ao cadastrar")
    })

  }

  irParaSignIn(){
    this.router.navigate(["signin"])
  }

}
