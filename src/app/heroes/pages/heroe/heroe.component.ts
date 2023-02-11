import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from "rxjs/operators";


@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit{
  @Input() heroes!: Heroe ;

  constructor( private activateRoute: ActivatedRoute,
               private heroeService:HeroesService,
               private router : Router ){}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe( switchMap(  ({ id }) => this.heroeService.getHeroeId( id ) ) ) 
    .subscribe( (heroe:Heroe) => this.heroes = heroe ); 
  }

  regresar(){
    this.router.navigate(['/heroes', 'listado']);
  }
}
