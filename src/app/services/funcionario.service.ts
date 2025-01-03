import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { serviceResponse } from '../models/serviceResponse';
import { Funcionario } from 'src/app/models/funcionario';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private apiUrl = `${environment.ApiUrl}Funcionario`
  dialog: any;


  constructor( private Http : HttpClient ) { }

  GetFuncionarios() : Observable<serviceResponse<Funcionario[]>> {
    return this.Http.get<serviceResponse<Funcionario[]>>(this.apiUrl);
  }

  CreateFuncionario(funcionario : Funcionario) : Observable<serviceResponse<Funcionario[]>> {
    return this.Http.post<serviceResponse<Funcionario[]>>(`${this.apiUrl}`, funcionario);
  }

  GetFuncionarioById(id : number) : Observable<serviceResponse<Funcionario>>{
    return this.Http.get<serviceResponse<Funcionario>>(`${this.apiUrl}/${id}`)
  }

  EditarFuncionario(funcionario : Funcionario) : Observable<serviceResponse<Funcionario>>{
    return this.Http.put<serviceResponse<Funcionario>>(`${this.apiUrl}`, funcionario);
  }

  InativarFuncionario(id : number) : Observable<serviceResponse<Funcionario>>{
    return this.Http.put<serviceResponse<Funcionario>>(`${this.apiUrl}/inativaFuncionario/?id=${id}`, id);
  }

  AtivarFuncionario(id : number) : Observable<serviceResponse<Funcionario>>{
    return this.Http.put<serviceResponse<Funcionario>>(`${this.apiUrl}/ativaFuncionario?id=${id}`, id);
  }

  DeleteFuncionario(id: number) : Observable<serviceResponse<Funcionario[]>>{
    return this.Http.delete<serviceResponse<Funcionario[]>>(`${this.apiUrl}?id=${id}`);
  }

}
