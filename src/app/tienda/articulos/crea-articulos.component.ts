import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Articulo } from '../../interfaces/articulo';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ArticuloService } from '../../services/articulo.service';
import { TiendaService } from '../../services/tienda.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crea-articulos',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './crea-articulos.component.html',
  styleUrl: './crea-articulos.component.css'
})
export class CreaArticulosComponent {
  public articuloObj: Articulo;
  public tiendas: any[];
    private modalService = inject(NgbModal);
    public modal_info = {
      title: "",
      body: ""
    };
  
    constructor(private articuloService: ArticuloService, private router: Router, private tiendaService: TiendaService) {
      this.articuloObj = {
        id: 0,
        name: '',
        price: 0,
        store_id: 0
      };
      this.tiendas = []
    }
    ngOnInit(): void {
      this.getTiendas();
    }
  
    getTiendas() {
      this.tiendaService.getStores().subscribe(res => {
        this.tiendas = res; 
      }, error => {
        console.error('Error al obtener tiendas', error);
      });
    }

    registro(content: TemplateRef<any>) {
      lastValueFrom(this.articuloService.createItem(this.articuloObj)).then(
        (resultado) => {
          if (resultado.success) {
            this.modal_info.title = "Operación exitosa";
            this.modal_info.body = "El articulo fue creado exitosamente! " + this.articuloObj.name;
            this.router.navigate(['/articulos/articulos']);
          } else {
            this.modal_info.title = "Algo salió mal!";
            this.modal_info.body = resultado.message + this.articuloObj.name;
          }
          this.openSm(content);
        },
        (error) => {
          console.error('Error al crear el articulo:', error);
          this.modal_info.title = "Algo salió mal!";
          this.modal_info.body = "No se pudo realizar el registro " + error;
          this.openSm(content);
        }
      );
    }
  
  
    openSm(content: TemplateRef<any>) {
      this.modalService.open(content, { size: 'sm' });
    }
}
