import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Funcionario } from 'src/app/models/funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  dadosFuncionario?: Funcionario;
  id! : number;

  constructor(private funcionarioService : FuncionarioService, private route : ActivatedRoute, private router : Router) {

  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.funcionarioService.GetFuncionarioById(this.id).subscribe((data) => {

      const dados = data.dados;

      dados.dataCriacao = new Date(dados.dataCriacao!).toLocaleDateString('pt-br');
      dados.dataAlteracao = new Date(dados.dataAlteracao!).toLocaleDateString('pt-br');

      this.dadosFuncionario = dados;
    })
  }

  InativarFuncionario(){
    this.funcionarioService.InativarFuncionario(this.id).subscribe((data) => {
      this.router.navigate(['']);
    })
  }

  AtivarFuncionario(){
    this.funcionarioService.AtivarFuncionario(this.id).subscribe((data) =>{
      this.router.navigate(['']);
    })
  }

}
