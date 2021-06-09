import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-delete',
  templateUrl: './livro-delete.component.html',
  styleUrls: ['./livro-delete.component.css']
})
export class LivroDeleteComponent implements OnInit {

  id_cat: String = ''
  livro: LivroModel = {
    id: "",
    nome_autor: "",
    texto: "",
    titulo: ""

  }

  constructor(private service: LivroService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {

    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()

  }
  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      
      this.livro.nome_autor = resposta.nome_autor
      this.livro.texto = resposta.texto
      this.livro.titulo = resposta.titulo

    })
  }

  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
  delete(): void{
    this.service.delete(this.livro.id!).subscribe(() => {
      this.router.navigate([`categorias/${this.id_cat}/livros` ])
      this.service.mensagem("livro apagado!")
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('erro ao apagar o livro')
    })
  }

}
