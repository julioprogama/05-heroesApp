import { Component, OnInit, Input } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent {
  
  @Input() heroes!: Heroe;
  
  id:string="";
  superHero:string="";
  alter_ego:string="";
  publisher:string=" ";
  first_appearance:string="";
  characters:string="";
  
  private _historial !:Publisher;
  /* public search : Gif[] = []; */
  
  get historial(): string[]{return [...this._historial];}

  constructor(private heroeService: HeroesService){ }
  
  /* get Publisher(){

  } */

  setHero(){
    this.heroes.id = this.id;
    this.heroes.alter_ego = this.alter_ego;
    //this.heroes.publisher = this.publisher;
    this.heroes.characters = this.characters;

  }

  agregar(){
    
    if(!this.heroes){


    }
    this.heroeService.addHero(this.heroes).subscribe(
      (hero:Heroe) => { this.heroes = hero; }
    );

    
  } 

}
