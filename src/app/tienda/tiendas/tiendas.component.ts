import { Component } from '@angular/core';
import { TiendaService } from '../../services/tienda.service';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tiendas',
  standalone: true, // Componente standalone
  imports: [CommonModule, RouterLink],
  templateUrl: './tiendas.component.html',
  styleUrls: ['./tiendas.component.css'] 
})
export class TiendasComponent {

  tiendas: any[] = []; 
  constructor(private tiendaService: TiendaService) {}

  ngOnInit() {
    this.getTiendas();
  } 

  getTiendas(){
    lastValueFrom(this.tiendaService.getStores())
      .then((res) => {
        this.tiendas = res;
      })
      .catch((error) => {
        console.error('Error al obtener tiendas:', error);
      });
  }

  deleteTienda(name: string) {
    if (confirm(`¿Estás seguro de que deseas eliminar la tienda "${name}"?`)) {
      lastValueFrom(this.tiendaService.deleteStore(name))
        .then((res) => {
          this.getTiendas(); 
        })
        .catch((error) => {
          console.error('Error al eliminar la tienda:', error);
        });
    }
  }

}
