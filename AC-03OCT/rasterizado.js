class Punto {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }
}

// Algoritmo de Bresenham para rasterizar líneas
function bresenham(x1, y1, x2, y2, context) {
    let dx = Math.abs(x2 - x1);
    let dy = Math.abs(y2 - y1);
    let sx = (x1 < x2) ? 1 : -1;
    let sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        context.fillRect(x1, y1, 1, 1); // Dibuja un píxel
        if (x1 === x2 && y1 === y2) break;
        let e2 = err * 2;
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

// Función para rasterizar el polígono
function dibujarPoligonoRaster(puntos) {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");

    const centroide = calcularCentroide(puntos);
    const puntosOrdenados = ordenarPuntos(puntos, centroide);

    for (let i = 0; i < puntosOrdenados.length; i++) {
        const puntoA = puntosOrdenados[i];
        const puntoB = puntosOrdenados[(i + 1) % puntosOrdenados.length];
        bresenham(puntoA.x * 50 + 250, puntoA.y * 50 + 250, puntoB.x * 50 + 250, puntoB.y * 50 + 250, ctx);
    }
}

dibujarPoligonoRaster(puntos);
