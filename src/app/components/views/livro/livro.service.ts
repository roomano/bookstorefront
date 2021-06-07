import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {LivroModel} from "./livro.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  baseUrl: String = environment.baseUrl
  constructor(private http: HttpClient) { }

  findAllByCategoria(id_cat: String): Observable<LivroModel[]> {
    const url = `${this.baseUrl}/livros?categoria=${id_cat}`
    return this.http.get<LivroModel[]>(url)
  }
}
