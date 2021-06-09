import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LivroModel} from "./livro.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  baseUrl: String = environment.baseUrl
  constructor(private http: HttpClient, private _snack: MatSnackBar) { }

  findAllByCategoria(id_cat: String): Observable<LivroModel[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<LivroModel[]>(url)
  }

  findById(id: String): Observable<LivroModel>{
    const url = `${this.baseUrl}/livros/${id}`
    return this.http.get<LivroModel>(url)
  }

  create(livro: LivroModel, id_cat: String): Observable<LivroModel> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.post<LivroModel>(url, livro)
  }

  update(livro: LivroModel): Observable<LivroModel>{
    const url = `${this.baseUrl}/livros/${livro.id}`
    return this.http.put<LivroModel>(url, livro)
  }
  delete(id: String): Observable<void>{
    const url = `${this.baseUrl}/livros/${id}`;
      return this.http.delete<void>(url)

  }

  mensagem(str: String):void {
    this._snack.open(`${str}`, 'ok!', {
      horizontalPosition: 'end', 
      verticalPosition:'top', duration: 5000
    })

  }
}
