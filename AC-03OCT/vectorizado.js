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

// Generar puntos aleatorios en un rango
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

// Función para dibujar el polígono
function dibujarPoligono(puntos) {
    const svg = document.getElementById("vectorCanvas");
    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    const puntosOrdenados = ordenarPuntos(puntos, calcularCentroide(puntos));
    const pointsString = puntosOrdenados.map(p => `${p.x * 50 + 250},${p.y * 50 + 250}`).join(" ");

    polygon.setAttribute("points", pointsString);
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("fill", "none");
    
    svg.appendChild(polygon);
}

// Función para dibujar el centroide y las líneas hacia los puntos
function dibujarCentroide(puntos) {
    const svg = document.getElementById("vectorCanvas");
    const centroide = calcularCentroide(puntos);
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centroide.x * 50 + 250);
    circle.setAttribute("cy", centroide.y * 50 + 250);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "red");

    svg.appendChild(circle);

    puntos.forEach(p => {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centroide.x * 50 + 250);
        line.setAttribute("y1", centroide.y * 50 + 250);
        line.setAttribute("x2", p.x * 50 + 250);
        line.setAttribute("y2", p.y * 50 + 250);
        line.setAttribute("stroke", "blue");

        svg.appendChild(line);
    });
}

// Lógica para mostrar/ocultar el centroide
let centroideVisible = false;
function toggleCentroid() {
    const svg = document.getElementById("vectorCanvas");
    svg.innerHTML = ""; // Limpiar el canvas
    dibujarPoligono(puntos);

    if (!centroideVisible) {
        dibujarCentroide(puntos);
    }
    centroideVisible = !centroideVisible;
}

// Generar puntos aleatorios y dibujar la figura
const puntos = generarPuntosAleatorios(6, 5); // Generar 6 puntos en un rango de 5 unidades
dibujarPoligono(puntos);
