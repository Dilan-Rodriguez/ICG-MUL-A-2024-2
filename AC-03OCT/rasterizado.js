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

// Generar puntos aleatorios
function generarPuntosAleatorios(n, rango) {
    const puntos = [];
    for (let i = 0; i < n; i++) {
        const x = Math.random() * rango - rango / 2;
        const y = Math.random() * rango - rango / 2;
        puntos.push(new Punto(x, y));
    }
    return puntos;
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

// Función para dibujar el centroide y las líneas
function dibujarCentroideRaster(puntos) {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");

    const centroide = calcularCentroide(puntos);
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(centroide.x * 50 + 250, centroide.y * 50 + 250, 5, 0, 2 * Math.PI);
    ctx.fill();

    puntos.forEach(p => {
        bresenham(centroide.x * 50 + 250, centroide.y * 50 + 250, p.x * 50 + 250, p.y * 50 + 250, ctx);
    });
}

// Lógica para mostrar/ocultar el centroide
let centroideVisible = false;
function toggleCentroid() {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    dibujarPoligonoRaster(puntos);

    if (!centroideVisible) {
        dibujarCentroideRaster(puntos);
    }
    centroideVisible = !centroideVisible;
}

// Generar puntos aleatorios y dibujar la figura
const puntos = generarPuntosAleatorios(6, 5); // Generar 6 puntos en un rango de 5 unidades
dibujarPoligonoRaster(puntos);