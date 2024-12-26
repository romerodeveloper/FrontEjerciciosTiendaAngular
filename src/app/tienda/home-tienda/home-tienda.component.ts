import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home-tienda',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './home-tienda.component.html',
  styleUrl: './home-tienda.component.css'
})
export class HomeTiendaComponent {

}
