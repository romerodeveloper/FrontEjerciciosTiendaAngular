import { Component, OnInit, inject, TemplateRef, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  public userObj: User;
  private modalService = inject(NgbModal);
  public modal_info = {
    title: "",
    body: ""
  };

  constructor(private userService: UserService) {
    this.userObj = {
      username: '',
      password: ''
    };
  }
  ngOnInit(): void {
  }

  registro(content: TemplateRef<any>) {
    lastValueFrom(this.userService.createUser(this.userObj)).then(
      (resultado) => {
        if (resultado.success) {
          this.modal_info.title = "Operación exitosa";
          this.modal_info.body = "El usuario fue creado exitosamente! " + this.userObj.username;
        } else {
          this.modal_info.title = "Algo salió mal!";
          this.modal_info.body = resultado.message + this.userObj.username;
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
