import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LivroModel} from "../livro.model";

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.css']
})
export class LivroCreateComponent implements OnInit {
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
  }
  create(): void{
      this.service.create(this.livro, this.id_cat).subscribe((resposta) =>{
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.service.mensagem('livro criado!')
      },err => {
        this.router.navigate([`categorias/${this.id_cat}/livros`])
        this.service.mensagem('erro na crição do livro')
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
  cancel(){
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }
}
