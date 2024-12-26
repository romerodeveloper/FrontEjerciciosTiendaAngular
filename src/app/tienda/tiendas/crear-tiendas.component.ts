import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Tienda } from '../../interfaces/tienda';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';
import { TiendaService } from '../../services/tienda.service';

@Component({
  selector: 'app-crear-tiendas',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './crear-tiendas.component.html',
  styleUrl: './crear-tiendas.component.css'
})
export class CrearTiendasComponent {
  public tiendaObj: Tienda;
  private modalService = inject(NgbModal);
  public modal_info = {
    title: "",
    body: ""
  };

  constructor(private tiendaService: TiendaService, private router: Router) {
    this.tiendaObj = {
      id: 0,
      name: ''
    };
  }
  ngOnInit(): void {
  }

  registro(content: TemplateRef<any>) {
    lastValueFrom(this.tiendaService.createTienda(this.tiendaObj)).then(
      (resultado) => {
        if (resultado.success) {
          this.modal_info.title = "Operación exitosa";
          this.modal_info.body = "La tienda fue creada exitosamente! " + this.tiendaObj.name;
          this.router.navigate(['/tiendas/tiendas']);
        } else {
          this.modal_info.title = "Algo salió mal!";
          this.modal_info.body = resultado.message + this.tiendaObj.name;
        }
        this.openSm(content);
      },
      (error) => {
        console.error('Error al crear la tienda:', error);
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

