import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styles: [ ]
})
export class DialogoComponent {
  constructor(public dialogRef: MatDialogRef<DialogoComponent>,  
              @Inject(MAT_DIALOG_DATA) public data: Heroe){}

  onNoClick(): void {
    this.dialogRef.close(true);
  }
  borrar(){
    this.dialogRef.close();
  }
}
