import { Component } from '@angular/core';
import { Matrix } from '../../models/matrix';
import { CdkAccordionModule } from '@angular/cdk/accordion';

@Component({
  selector: 'app-ejercicio1',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './ejercicio1.component.html',
  styleUrl: './ejercicio1.component.css'
})
export class Ejercicio1Component {
  items = [
    { matrix: [[2, 3], 2, 3], matrix_txt: "[[2,3],2,3]", resultado: "", executed: false },
    { matrix: [[2, 3], [2, 3]], matrix_txt: "[[2, 3], [2, 3]]", resultado: "", executed: false },
    { matrix: [1,3,[2, 5], 2, 8], matrix_txt: "[1,3,[2, 5], 2, 8]", resultado: "", executed: false },
    { matrix: [[2],[1],[1,2,3]], matrix_txt: "[[2],[1],[1,2,3]]", resultado: "", executed: false },
    { matrix: [2], matrix_txt: "[2]", resultado: "", executed: false },
    { matrix: [5,6,8,9,5], matrix_txt: "[5,6,8,9,5]", resultado: "", executed: false },
    { matrix: [[1,3,4,5],[0,2,6,8],[4,5,91,15],[8,25,16,1]], matrix_txt: "[[1,3,4,5],[0,2,6,8],[4,5,91,15],[8,25,16,1]]", resultado: "", executed: false },
    { matrix: [[1,3,[1,2,3,5,6,8,7,9],5],[0,2,6,[2,6,6,4,5,2,89,7,45]],[4,5,[9,3,6,4,2],15],[[1,2,3,4,5,6,7,8,9,10,11,12,13],25,16,1]], matrix_txt: "[[1,3,[1,2,3,5,6,8,7,9],5],[0,2,6,[2,6,6,4,5,2,89,7,45]],[4,5,[9,3,6,4,2],15],[[1,2,3,4,5,6,7,8,9,10,11,12,13],25,16,1]]", resultado: "", executed: false },
  ];
  expandedIndex = 0;
  calcular(matrix: Array<any>, index: number) {
    if (!this.items[index].executed) {
      let matriz = new Matrix(matrix);
      this.items[index].resultado = `
        <h4>Resultado</h4>
        <table class="table">
          <thead>
            <tr>
              <th>dimension</th>
              <th>straight</th>
              <th>compute</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                  <td>${matriz.dimension}</td>
                  <td>${matriz.straight}</td>
                  <td>${matriz.compute}</td>
              </tr>
          </tbody>
        </table>
      `;
      this.items[index].executed = true;
    }
  }
}
