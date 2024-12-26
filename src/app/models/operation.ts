import * as math from 'mathjs';
export class Operation {
    public value: string;
    public operation: boolean;
    public compute: number;
    constructor(value: string) {
        this.value = value;
        this.operation = this.operationVerify();
        this.compute = this.getValue();
    }

    private operationVerify(): boolean {
        if (!this.verifyParenthesis(this.value)) return false;
        const regex = /^[+\-*/\d\s()]+$/;
        if (!regex.test(this.value)) {
            return false;
        }
        return /[+\-*/]/.test(this.value);
    }

    private verifyParenthesis(value: string): boolean {
        let contador = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === "(") {
                contador++;
            } else if (value[i] === ")") {
                contador--;
            }
            if (contador < 0) {
                return false;
            }
        }
        return contador === 0;
    }

    private getValue(): number {
        try {
            if (this.operation) {
                return math.evaluate(this.value);
            }
        } catch (error) {
            console.log("Operación inválida");
        }
        return 0;
    }
}
