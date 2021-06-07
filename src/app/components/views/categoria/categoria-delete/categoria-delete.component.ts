import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CategoriaService} from "../categoria.service";
import {Categoria} from "../categoria.model";

@Component({
  selector: 'app-categoria-delete',
  templateUrl: './categoria-delete.component.html',
  styleUrls: ['./categoria-delete.component.css']
})
export class CategoriaDeleteComponent implements OnInit {

  categoria: Categoria = {
    id: "",
    nome: "",
    descricao: ""
  }
  constructor(private service: CategoriaService,private actRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.categoria.id = this.actRoute.snapshot.paramMap.get('id')!
    this.findById()
  }
  findById(): void{
    this.service.findByID(this.categoria.id!).subscribe((resposta)=>{
      this.categoria.nome = resposta.nome
      this.categoria.descricao = resposta.descricao
    })
  }

  delete(): void{
    this.service.delete(this.categoria.id!).subscribe((resposta)=>{
      this.service.mensagem("categoria removida!")
      this.router.navigate(['categorias'])
    }, err => {
      this.service.mensagem(err.error.error)
    })
  }

  cancel(): void{
    this.router.navigate(["categorias"])
  }
}
