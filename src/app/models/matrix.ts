export class Matrix {
    public matrix: Array<any>;
    public dimension: number;
    public straight: boolean;
    public compute: number;
    constructor(matrix: Array<any>) {
        this.matrix = matrix;
        let props = this.calcularPropiedades();
        this.dimension = props[0];
        this.straight = props[1];
        this.compute = props[2];
    }

    private calcularPropiedades(): Array<any> {
        let props = [this.matrix.length, true, 0, this.matrix.length];
        for (var i in this.matrix) {
            const item = this.matrix[i];
            if (Array.isArray(item)) {
                props = this.calcularArray(item, props);
                if (item.length != this.matrix.length) props[1] = false;
            } else props[2] += item;
        }
        return props;
    }

    private calcularArray(matrix: Array<any>, props: Array<any>): Array<any> {
        for (let i = 0; i < matrix.length; i++) {
            const item = matrix[i];
            if (Array.isArray(item)) {
                let new_props = this.calcularArray(item, props);
                if (new_props[0] > props[0]) props[0] = new_props[0];
                if (item.length != props[3]) props[1] = false;
            } else props[2] += item;
        }
        if (matrix.length > props[0]) props[0] = matrix.length;
        return props;
    }
}
