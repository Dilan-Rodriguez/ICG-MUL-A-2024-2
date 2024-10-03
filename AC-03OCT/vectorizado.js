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

// Función para dibujar el polígono en SVG
function dibujarPoligonoVector(puntos) {
    const svg = document.getElementById("vectorCanvas");
    svg.innerHTML = ''; // Limpiar el contenido del SVG

    const centroide = calcularCentroide(puntos);
    const puntosOrdenados = ordenarPuntos(puntos, centroide);

    // Crear el polígono con puntos en SVG
    let polyline = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", "black");
    polyline.setAttribute("stroke-width", 2);

    let puntosSvg = puntosOrdenados.map(p => `${p.x * 50 + 250},${p.y * 50 + 250}`).join(' ');
    polyline.setAttribute("points", puntosSvg);

    svg.appendChild(polyline);
}

// Función para dibujar el centroide y las líneas hacia los puntos en SVG
function dibujarCentroideVector(puntos) {
    const svg = document.getElementById("vectorCanvas");
    const centroide = calcularCentroide(puntos);

    // Dibuja el centroide como un pequeño círculo
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", centroide.x * 50 + 250);
    circle.setAttribute("cy", centroide.y * 50 + 250);
    circle.setAttribute("r", 5);
    circle.setAttribute("fill", "red");
    svg.appendChild(circle);

    // Dibuja líneas desde el centroide a cada punto
    puntos.forEach(p => {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", centroide.x * 50 + 250);
        line.setAttribute("y1", centroide.y * 50 + 250);
        line.setAttribute("x2", p.x * 50 + 250);
        line.setAttribute("y2", p.y * 50 + 250);
        line.setAttribute("stroke", "red");
        line.setAttribute("stroke-width", 1);
        svg.appendChild(line);
    });
}

// Lógica para mostrar/ocultar el centroide
let centroideVisible = false;
function toggleCentroid() {
    const svg = document.getElementById("vectorCanvas");
    svg.innerHTML = ''; // Limpiar el SVG
    dibujarPoligonoVector(puntos); // Redibujar el polígono

    if (!centroideVisible) {
        dibujarCentroideVector(puntos); // Dibujar el centroide si está desactivado
    }
    centroideVisible = !centroideVisible;
}

// Generar puntos aleatorios y dibujar la figura
const puntos = generarPuntosAleatorios(6, 5); // Generar 6 puntos en un rango de 5 unidades
dibujarPoligonoVector(puntos);

// Determinar si la figura es convexa o cóncava y mostrar en consola
const resultado = esConvexoOConcavo(puntos);
console.log("La figura es: " + resultado);

// Mostrar el resultado en la página
const resultadoDiv = document.createElement("div");
resultadoDiv.innerHTML = `<h2>La figura es: ${resultado}</h2>`;
document.body.appendChild(resultadoDiv);
