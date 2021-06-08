import { Component, OnInit } from '@angular/core';
import {LivroModel} from "../livro.model";
import {LivroService} from "../livro.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-livro-read-all',
  templateUrl: './livro-read-all.component.html',
  styleUrls: ['./livro-read-all.component.css']
})
export class LivroReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id','titulo', 'livros','accoes']

  id_cat: String = ''

  livros: LivroModel[] = []

  constructor(private service: LivroService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll()
  }

  findAll(): void{
    this.service.findAllByCategoria(this.id_cat).subscribe((resposta) => {
      this.livros = resposta

    })
  }
  navegarCriaLivro(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros/create`])
  }
  cancel(){
    this.router.navigate(['categorias'])
  }
}

