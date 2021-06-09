import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-livro-update',
  templateUrl: './livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {

  id_cat: String = ''

  livro: LivroModel = {
    id: "",
    nome_autor: "",
    texto: "",
    titulo: ""

  }

  titulo = new FormControl('',[Validators.minLength(4)])
  nome_autor = new FormControl('',[Validators.minLength(4)])
  texto = new FormControl('', [Validators.minLength(10)])

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }
  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta)=>{

      this.livro.nome_autor = resposta.nome_autor
      this.livro.texto = resposta.texto
      this.livro.titulo = resposta.titulo
    })

  }
  cancel() {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
  update(): void{
    this.service.update(this.livro).subscribe((resposta) => {
      this.service.mensagem("livro atualizado")
      this.router.navigate([`categorias/${this.id_cat}/livros` ])
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`])
      this.service.mensagem('erro ao atualizar o livro')
    })
  }

  // @ts-ignore
  getMessage(message: String) {
    switch (message) {
      case 'titulo':
        return 'o campo TÍTULO deve conter 4 a 30 caracteres'
      case 'nome_autor':
        return 'o campo NOME DO AUTOR deve conter 4 a 50 caracteres'
      case 'texto':
        return 'o campo TEXTO deve conter 10 a 1000 caracteres'
      case 'desabilitado':
        return true
    }
  }
}
