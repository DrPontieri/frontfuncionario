import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Component, ComponentRef, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { ExcluirComponent } from 'src/app/componentes/excluir/excluir.component';
import { ExcluirlogicoComponent } from 'src/app/componentes/excluirlogico/excluirlogico.component';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  funcionarioGeral: Funcionario[] = [];

  Colunas = ['situação', 'nome', 'sobrenome', 'departamento', 'turno', 'acoes', 'excluir'];



  constructor(private funcionarioService: FuncionarioService, public dialog: MatDialog){ }

  ngOnInit(): void {

    this.funcionarioService.GetFuncionarios().subscribe(data => {
      const dados = data.dados;

      dados.map((item) => {
          item.dataCriacao = new Date(item.dataCriacao!).toLocaleDateString('pt-br');
          item.dataAlteracao = new Date(item.dataAlteracao!).toLocaleDateString('pt-br');
        })

        this.funcionarios = data.dados;
        this.funcionarioGeral = data.dados;
    })
  }

  search(event : Event){
    const target = event.target as HTMLInputElement;
    const value = target.value.toLocaleLowerCase();

    this.funcionarios = this.funcionarioGeral.filter(Funcionario => {
      return Funcionario.nome.toLowerCase().includes(value);
    })
  }

  OpenDialog(id:number, idFuncionario:number){
    switch (id) {
      case 0:
        this.dialog.open(ExcluirlogicoComponent, {
          width: '430px',
          height: '430px'
        });
      break;
      case 1:
        this.dialog.open(ExcluirComponent, {
          width: '430px',
          height: '430px',
          data:{
            id : idFuncionario
          }
        });
      break;
    }


    //this.dialog.open(ExcluirComponent, {
    //  width: '350px',
    //  height: '350px'
    //});
  }


}
