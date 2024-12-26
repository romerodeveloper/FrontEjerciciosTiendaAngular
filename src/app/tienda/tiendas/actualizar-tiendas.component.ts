import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tienda } from '../../interfaces/tienda';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-actualizar-tiendas',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './actualizar-tiendas.component.html',
  styleUrl: './actualizar-tiendas.component.css'
})
export class ActualizarTiendasComponent {
  public tiendaObj: Tienda;
  private modalService = inject(NgbModal);
  public modal_info = {
    title: "",
    body: ""
  };

  constructor(private tiendaService: TiendaService, private route: ActivatedRoute, private router: Router) {
    this.tiendaObj = {
      id : 0, 
      name: ''
    };
  }
  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.cargarTienda(name); 
  }

  cargarTienda(name: string | null) {
    if (name) {
      lastValueFrom(this.tiendaService.getTiendaByName(name)).then(tienda => {
        this.tiendaObj = tienda; 
      }).catch(error => {
        console.error('Error al cargar la tienda:', error);
        this.modal_info.title = "Error";
        this.modal_info.body = "No se pudo cargar la tienda.";
      });
    }
  }

  actualizar(content: TemplateRef<any>) {
    lastValueFrom(this.tiendaService.updateTienda(this.tiendaObj)).then(
      (resultado) => {
        if (resultado.success) {
          this.modal_info.title = "Operación exitosa";
          this.modal_info.body = "La tienda fue actualizado exitosamente! " + this.tiendaObj.name;
          this.router.navigate(['/tiendas/tiendas']);
        } else {
          this.modal_info.title = "Algo salió mal!";
          this.modal_info.body = resultado.message + this.tiendaObj.name;
        }
        this.openSm(content);
      },
      (error) => {
        console.error('Error al crear el usuario:', error);
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
