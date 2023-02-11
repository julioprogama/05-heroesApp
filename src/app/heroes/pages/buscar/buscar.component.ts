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
  heroeseleccionado: Heroe| undefined;

  constructor( private heroeService: HeroesService){ }


  buscando(){
    this.heroeService.getSugerencias( this.termino.trim() ).subscribe( heroe => this.heroes = heroe );
  }

  opcionSelecionada (event: MatAutocompleteSelectedEvent){
    
    if (!event.option.value){
      this.heroeseleccionado =undefined;
      return;
    }
    
    const hero:Heroe = event.option.value;
    
    this.termino = hero.superhero;
    this.heroeService.getHeroeId( hero.id! ).subscribe( heroe => this.heroeseleccionado = heroe );
    

  }
}
