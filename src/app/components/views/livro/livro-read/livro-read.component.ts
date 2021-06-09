import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LivroModel } from '../livro.model';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-livro-read',
  templateUrl: './livro-read.component.html',
  styleUrls: ['./livro-read.component.css']
})
export class LivroReadComponent implements OnInit {
  id_cat: String = ""

  livro: LivroModel = {
    id: "",
    titulo: "",
    nome_autor: "",
    texto: ""
  }
  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta)=>{
      //this.livro = resposta

      this.livro.nome_autor = resposta.nome_autor
      this.livro.texto = resposta.texto
      this.livro.titulo = resposta.titulo
    })
  }
  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

}
