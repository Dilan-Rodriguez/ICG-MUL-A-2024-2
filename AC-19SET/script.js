const svg = document.getElementById('svg');

class Linea {
    constructor(x1, y1, x2, y2) {
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    dibujar() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this._x1);
        line.setAttribute("y1", this._y1);
        line.setAttribute("x2", this._x2);
        line.setAttribute("y2", this._y2);
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
    }
}

class Circunferencia {
    constructor(cx, cy, r) {
        this._cx = cx;
        this._cy = cy;
        this._r = r;
    }

    dibujar() {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this._cx);
        circle.setAttribute("cy", this._cy);
        circle.setAttribute("r", this._r);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "black");
        svg.appendChild(circle);
    }
}

class Elipse {
    constructor(cx, cy, a, b) {
        this._cx = cx;
        this._cy = cy;
        this._a = a;
        this._b = b;
    }

    dibujar() {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this._cx);
        ellipse.setAttribute("cy", this._cy);
        ellipse.setAttribute("rx", this._a);
        ellipse.setAttribute("ry", this._b);
        ellipse.setAttribute("fill", "none");
        ellipse.setAttribute("stroke", "black");
        svg.appendChild(ellipse);
    }
}

// Crear y dibujar las primitivas
const linea = new Linea(50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar();
