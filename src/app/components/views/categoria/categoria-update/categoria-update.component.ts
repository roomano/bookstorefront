import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Categoria} from "../categoria.model";
import {CategoriaService} from "../categoria.service";

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.css']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao:''
  }

  constructor(private router: Router, private service: CategoriaService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoria.id = this.actRoute.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findByID(this.categoria.id!).subscribe((resposta) => {
      this.categoria.nome = resposta.nome
      this.categoria.descricao  = resposta.descricao
    })
  }

  atualizar(): void{
    this.service.update(this.categoria).subscribe((reposta) =>{
      this.service.mensagem("categoria atualizada!")
      this.router.navigate(['categorias'])
    }, err =>{
      this.service.mensagem('verifique se todos os campos estão preenchidos')
      console.log(err)
    })
  }

  cancel(): void{
    this.router.navigate(['categorias'])
  }
}
