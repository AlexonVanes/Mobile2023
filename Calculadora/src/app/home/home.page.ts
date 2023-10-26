import { Component } from "@angular/core";

enum Operacao {
  Soma = 0,
  Subtracao = 1,
  Multiplicacao = 2,
  Divisao = 3,
  Porcentagem = 4,
  Negativo = 5
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  visor: string = '0';
  historico: string = ''; // Variável para mostrar o histórico
  numeros: number[] = [];
  operacoes: Operacao[] = [];
  novaOperacaoSelecionada: boolean = false;

  constructor() { }

  adicionarNumero(valor: string) {
    if (this.visor === '0' || this.visor === 'Erro' || this.novaOperacaoSelecionada) {
      this.visor = valor;
      this.novaOperacaoSelecionada = false;
    } else {
      this.visor += valor;
    }

    // Adicionar o número ou operação ao histórico
    this.historico += valor;
  }

  adicionarOperacao(valor: Operacao) {
    this.novaOperacaoSelecionada = true;
    if (valor === Operacao.Porcentagem) {
      // Se a operação for porcentagem, calcula imediatamente
      this.calcularPorcentagem();
      this.historico += '%';
    } else if (valor === Operacao.Negativo) {
      // Se a operação for inverter o sinal, inverte o sinal do número atual
      this.visor = (-(+this.visor)).toString();
      this.historico += '(-)';
    } else {
      this.numeros.push(+this.visor);
      this.operacoes.push(valor);
      this.visor = '0'; // Limpa o visor para uma nova entrada

      // Adicionar a operação ao histórico
      this.historico += this.getOperacaoSymbol(valor);
    }
  }

  calcular() {
    if (this.operacoes.length > 0) {
      this.numeros.push(+this.visor);
      let resultado = this.numeros[0];

      for (let i = 0; i < this.operacoes.length; i++) {
        const operacao = this.operacoes[i];
        const proximoNumero = this.numeros[i + 1];

        switch (operacao) {
          case Operacao.Soma:
            resultado += proximoNumero;
            break;
          case Operacao.Subtracao:
            resultado -= proximoNumero;
            break;
          case Operacao.Multiplicacao:
            resultado *= proximoNumero;
            break;
          case Operacao.Divisao:
            if (proximoNumero !== 0) {
              resultado /= proximoNumero;
            } else {
              this.visor = "Erro"; // Lida com divisão por zero
              return;
            }
            break;
          case Operacao.Negativo:
            resultado *= -1;
            break;
        }
      }
      this.visor = resultado.toString();
      this.novaOperacaoSelecionada = true;

      // Limpar o histórico após o cálculo
      this.historico = '';
    }
  }

  calcularPorcentagem() {
    if (this.numeros.length > 0) {
      const valorAnterior = this.numeros[this.numeros.length - 1];
      this.visor = (valorAnterior * (+this.visor / 100)).toString();
    } else {
      this.visor = (+this.visor / 100).toString();
    }
  }

  getOperacaoSymbol(operacao: Operacao): string {
    switch (operacao) {
      case Operacao.Soma:
        return '+';
      case Operacao.Subtracao:
        return '-';
      case Operacao.Multiplicacao:
        return 'x';
      case Operacao.Divisao:
        return '÷';
      default:
        return '';
    }
  }

  zerar() {
    this.visor = '0';
    this.numeros = [];
    this.operacoes = [];
    this.novaOperacaoSelecionada = false;
    this.historico = ''; 
  }
  
}
