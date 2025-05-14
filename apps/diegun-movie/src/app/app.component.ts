import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  showButton = false;

  constructo(){
    window.addEventListener('scroll',// escucha el scroll, y si es mayor a cien 
      ()=>{
        this.showButton = window.scrollY > 100;// si es mayor a cien, devolvera true , si no, devolvera false
      }
    )
  }

  goTop(){
    window.scrollTo(// envia al top con suavidad
      {top : 0,behavior : 'smooth'}
    )
  }
}
