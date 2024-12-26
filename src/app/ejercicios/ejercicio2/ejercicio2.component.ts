import { Component } from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Operation } from '../../models/operation';

@Component({
  selector: 'app-ejercicio2',
  standalone: true,
  imports: [CdkAccordionModule],
  templateUrl: './ejercicio2.component.html',
  styleUrl: './ejercicio2.component.css'
})
export class Ejercicio2Component {
  items = [
    { operation: "4 + 3", executed: false, resultado: "" },
    { operation: "8 - (9 + 8)", executed: false, resultado: "" },
    { operation: "8 / 2", executed: false, resultado: "" },
    { operation: "3 * 9 + 8)", executed: false, resultado: "" },
    { operation: "1 / 8", executed: false, resultado: "" },
    { operation: "1 + 2 * 3", executed: false, resultado: "" },
    { operation: "4/5 + 2 * 9", executed: false, resultado: "" },
  ];
  expandedIndex = 0;
  calcular(strOperation: string, index: number) {
    if (!this.items[index].executed) {
      let operation = new Operation(strOperation);
      this.items[index].resultado = `
      <h4>Resultado</h4>
      <table class="table">
        <thead>
          <tr>
            <th>operation</th>
            <th>compute</th>
          </tr>
        </thead>
        <tbody>
            <tr>
                <td>${operation.operation}</td>
                <td>${operation.compute}</td>
            </tr>
        </tbody>
      </table>
    `;
      this.items[index].executed = true;
    }
  }
}
