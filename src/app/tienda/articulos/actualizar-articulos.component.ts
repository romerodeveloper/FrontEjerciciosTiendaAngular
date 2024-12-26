import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Articulo } from '../../interfaces/articulo';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { ArticuloService } from '../../services/articulo.service';
import { CommonModule } from '@angular/common';
import { TiendaService } from '../../services/tienda.service';
@Component({
  selector: 'app-actualizar-articulos',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './actualizar-articulos.component.html',
  styleUrl: './actualizar-articulos.component.css'
})
export class ActualizarArticulosComponent {
  public articuloObj: Articulo;
  public tiendas: any[];
  private modalService = inject(NgbModal);
  public modal_info = {
    title: "",
    body: ""
  };

  constructor(private articuloService: ArticuloService, private router: Router,
    private tiendaService: TiendaService,
    private route: ActivatedRoute) {
    this.articuloObj = {
      id: 0,
      name: '',
      price: 0,
      store_id: 0
    };
    this.tiendas = []
  }

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.cargarTienda(name);
    this.getTiendas();
  }

  getTiendas() {
    this.tiendaService.getStores().subscribe(res => {
      this.tiendas = res;
    }, error => {
      console.error('Error al obtener tiendas', error);
    });
  }

  cargarTienda(name: string | null) {
    if (name) {
      lastValueFrom(this.articuloService.getItemByName(name)).then(articulo => {
        this.articuloObj = articulo;
      }).catch(error => {
        console.error('Error al cargar la tienda:', error);
        this.modal_info.title = "Error";
        this.modal_info.body = "No se pudo cargar la tienda.";
      });
    }
  }

  actualizar(content: TemplateRef<any>) {
    lastValueFrom(this.articuloService.updateItem(this.articuloObj)).then(
      (resultado) => {
        if (resultado.success) {
          this.modal_info.title = "Operación exitosa";
          this.modal_info.body = "El articulo fue actualizado exitosamente! " + this.articuloObj.name;
          this.router.navigate(['/tiendas/tiendas']);
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
