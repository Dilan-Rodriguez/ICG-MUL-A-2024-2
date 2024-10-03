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
        context.fillRect(x1, y1, 1, 1); // Dibuja un píxel en la posición actual
        if (x1 === x2 && y1 === y2) break; // Si llegó al final de la línea, termina
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

// Función para calcular el centroide
function calcularCentroide(puntos) {
    let xSum = 0, ySum = 0;
    puntos.forEach(p => {
        xSum += p.x;
        ySum += p.y;
    });
    return new Punto(xSum / puntos.length, ySum / puntos.length);
}

// Función para ordenar los puntos por ángulo con respecto al centroide
function ordenarPuntos(puntos, centroide) {
    return puntos.slice().sort((a, b) => {
        const angA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
        const angB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
        return angA - angB;
    });
}

// Calcular el producto cruzado entre tres puntos
function productoCruzado(puntoA, puntoB, puntoC) {
    const abx = puntoB.x - puntoA.x;
    const aby = puntoB.y - puntoA.y;
    const acx = puntoC.x - puntoA.x;
    const acy = puntoC.y - puntoA.y;
    return abx * acy - aby * acx;
}

// Determinar si la figura es convexa o cóncava
function esConvexoOConcavo(puntos) {
    const centroide = calcularCentroide(puntos);
    const puntosOrdenados = ordenarPuntos(puntos, centroide);
    let signos = [];

    for (let i = 0; i < puntosOrdenados.length; i++) {
        const puntoA = puntosOrdenados[i];
        const puntoB = puntosOrdenados[(i + 1) % puntosOrdenados.length];
        const puntoC = puntosOrdenados[(i + 2) % puntosOrdenados.length];
        const cruz = productoCruzado(puntoA, puntoB, puntoC);
        signos.push(cruz);
    }

    const todosPositivos = signos.every(c => c > 0);
    const todosNegativos = signos.every(c => c < 0);

    if (todosPositivos || todosNegativos) {
        return "convexo";
    } else {
        return "concavo";
    }
}

// Función para rasterizar el polígono
function dibujarPoligonoRaster(puntos) {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");

    const centroide = calcularCentroide(puntos);
    const puntosOrdenados = ordenarPuntos(puntos, centroide);

    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < puntosOrdenados.length; i++) {
        const puntoA = puntosOrdenados[i];
        const puntoB = puntosOrdenados[(i + 1) % puntosOrdenados.length];
        // Aplicar escalado y trasladar al centro del canvas
        bresenham(Math.round(puntoA.x * 50 + 250), Math.round(puntoA.y * 50 + 250),
                  Math.round(puntoB.x * 50 + 250), Math.round(puntoB.y * 50 + 250), ctx);
    }
}

// Función para dibujar el centroide y las líneas hacia los puntos
function dibujarCentroideRaster(puntos) {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");

    const centroide = calcularCentroide(puntos);
    
    // Dibuja el centroide como un pequeño círculo
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(Math.round(centroide.x * 50 + 250), Math.round(centroide.y * 50 + 250), 5, 0, 2 * Math.PI);
    ctx.fill();

    // Dibuja líneas desde el centroide a cada punto
    puntos.forEach(p => {
        bresenham(Math.round(centroide.x * 50 + 250), Math.round(centroide.y * 50 + 250),
                  Math.round(p.x * 50 + 250), Math.round(p.y * 50 + 250), ctx);
    });
}

// Lógica para mostrar/ocultar el centroide
let centroideVisible = false;
function toggleCentroid() {
    const canvas = document.getElementById("rasterCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    dibujarPoligonoRaster(puntos); // Redibujar el polígono

    if (!centroideVisible) {
        dibujarCentroideRaster(puntos); // Dibujar el centroide si está desactivado
    }
    centroideVisible = !centroideVisible;
}

// Generar puntos aleatorios y dibujar la figura
const puntos = generarPuntosAleatorios(6, 5); // Generar 6 puntos en un rango de 5 unidades
dibujarPoligonoRaster(puntos);

// Determinar si la figura es convexa o cóncava y mostrar en consola
const resultado = esConvexoOConcavo(puntos);
console.log("La figura es: " + resultado);

// Mostrar el resultado en la página
const resultadoDiv = document.createElement("div");
resultadoDiv.innerHTML = `<h2>La figura es: ${resultado}</h2>`;
document.body.appendChild(resultadoDiv);
