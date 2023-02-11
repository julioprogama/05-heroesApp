import { Component} from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatDialog} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogoComponent } from '../../components/confirmacion/dialogo.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
     
  ]
})
export class AgregarComponent {
  
  heroe: Heroe= {
    superhero:'',
    alter_ego:'',
    characters:'',
    first_appearance:'',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  publishers = [
    {
      id:'DC Comics',
      desc: 'DC - comics'
    },
    {
      id:'Marvel Comics',
      desc: 'Marvel - comics'
    }
  ];

  constructor(private heroeService: HeroesService, private activatedRoute: ActivatedRoute,
              private router: Router, private _snackBar: MatSnackBar, public dialog: MatDialog ){ }


  ngOnInit(): void {

    if (this.router.url.includes('editar')){

      this.activatedRoute.params
          .pipe( switchMap(  ({ id }) => this.heroeService.getHeroeId( id ) ) ) 
          .subscribe( (heroe:Heroe) => this.heroe = heroe ); 
    }
  }

  private mostrarSnackbar(mensaje: string){
    this._snackBar.open(mensaje,'', {
      duration: 2000
    } );
  }
 
  agregar(){
    if (this.heroe.superhero.trim().length === 0){
      return;
    }
    if (this.heroe.id){
      this.heroeService.editarHero(this.heroe)
      .subscribe( (hero:Heroe) => { this.heroe = hero; 
                                    this.router.navigate(['/heroes/editar',  hero.id]);
                                    this.mostrarSnackbar('Actualizado');
                                  } );
    }else{
      this.heroeService.agregarHero(this.heroe)
        .subscribe( (hero:Heroe) => { this.router.navigate(['/heroes/editar',  hero.id]) } );
        this.mostrarSnackbar('Registro creado');
    }
  } 
  
  borrar(){
    const dialogRef = this.dialog
          .open(DialogoComponent, { 
            width:'250px',  
            data: this.heroe   
          });

    dialogRef.afterClosed()
        .subscribe(
            (result) => {
                if ( result ) {
                  this.heroeService.deleteHero( this.heroe.id! )
                    .subscribe( hero => { this.router.navigate(['/heroes']) 
                  });
                }
            });
  }
}
