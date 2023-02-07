import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete'
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent {
  termino: string = '';
  heroes: Heroe[] = [];
  heroe!: Heroe ;

  mensaje: boolean = true;

  constructor( private heroeService: HeroesService){

  }
  buscando(){
    this.heroeService.getSugerencias( this.termino )
      .subscribe( heroe => this.heroes = heroe )
      if (!this.heroes){
        this.mensaje = false;
      }
  }

  opcionSelecionada (event: MatAutocompleteSelectedEvent){
    const hero:Heroe = event.option.value;
    this.termino = hero.superhero;
    if (this.heroes){
      this.heroeService.getHeroeId( hero.id! ).subscribe( heroe => this.heroe = heroe );
    }
    
  }
}
