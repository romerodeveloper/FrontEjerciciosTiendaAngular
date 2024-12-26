import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ArticuloService } from '../../services/articulo.service';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports:[CommonModule, RouterLink] ,
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css'
})
export class ArticulosComponent {
  articulos: any[] = []; 
  tiendas: any[] = [];
  constructor(private articuloService: ArticuloService, private tiendaService: TiendaService) {}

  ngOnInit() {
    this.getArticulos();
    this.getTiendas();
  } 

  getArticulos() {
    lastValueFrom(this.articuloService.getItems())
      .then((res) => {
        this.articulos = res; 
      })
      .catch((error) => {
        console.error('Error al obtener artículos:', error);
      });
  }

  getTiendas() {
    this.tiendaService.getStores().subscribe(
      (res) => {
        this.tiendas = res;
      },
      (error) => {
        console.error('Error al obtener tiendas:', error);
      }
    );
  }

  getStoreName(storeId: number): string {
    const tienda = this.tiendas.find(tienda => tienda.id === storeId);
    return tienda ? tienda.name : 'Tienda no encontrada';
  }

  deleteArticulo(name: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este artículo?')) {
      lastValueFrom(this.articuloService.deleteItem(name))
        .then((res) => {
          this.getArticulos();
        })
        .catch((error) => {
          console.error('Error al eliminar el artículo:', error);
        });
    }
  }
}


