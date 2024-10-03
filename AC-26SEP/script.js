const svg = document.getElementById('svg');

class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}

class Linea {
    #punto1;
    #punto2;

    constructor(punto1, punto2) {
        this.#punto1 = punto1;
        this.#punto2 = punto2;
    }

    dibujar() {
        // Algoritmo de Bresenham para dibujar una línea
        let x1 = this.#punto1.x;
        let y1 = this.#punto1.y;
        let x2 = this.#punto2.x;
        let y2 = this.#punto2.y;

        let dx = Math.abs(x2 - x1);
        let dy = Math.abs(y2 - y1);
        let sx = (x1 < x2) ? 1 : -1;
        let sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            // Dibujar un pequeño círculo en cada punto calculado
            const pixel = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            pixel.setAttribute("cx", x1);
            pixel.setAttribute("cy", y1);
            pixel.setAttribute("r", 1);  // Representa un "pixel" en SVG
            pixel.setAttribute("fill", "black");
            svg.appendChild(pixel);

            if (x1 === x2 && y1 === y2) break;
            let e2 = 2 * err;
            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }
}

class Circunferencia {
    #centro;
    #radio;

    constructor(centro, radio) {
        this.#centro = centro;
        this.#radio = radio;
    }

    dibujar() {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", this.#centro.x);
        circle.setAttribute("cy", this.#centro.y);
        circle.setAttribute("r", this.#radio);
        circle.setAttribute("fill", "none");
        circle.setAttribute("stroke", "black");
        svg.appendChild(circle);
    }
}

class Elipse {
    #centro;
    #rx;
    #ry;

    constructor(centro, rx, ry) {
        this.#centro = centro;
        this.#rx = rx;
        this.#ry = ry;
    }

    dibujar() {
        const ellipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        ellipse.setAttribute("cx", this.#centro.x);
        ellipse.setAttribute("cy", this.#centro.y);
        ellipse.setAttribute("rx", this.#rx);
        ellipse.setAttribute("ry", this.#ry);
        ellipse.setAttribute("fill", "none");
        ellipse.setAttribute("stroke", "black");
        svg.appendChild(ellipse);
    }
}

// Crear y dibujar las primitivas usando el algoritmo de Bresenham para la línea
const punto1 = new Punto(50, 50);
const punto2 = new Punto(200, 200);
const linea = new Linea(punto1, punto2);
linea.dibujar();

const centroCirc = new Punto(300, 100);
const circunferencia = new Circunferencia(centroCirc, 50);
circunferencia.dibujar();

const centroElipse = new Punto(400, 300);
const elipse = new Elipse(centroElipse, 80, 50);
elipse.dibujar();