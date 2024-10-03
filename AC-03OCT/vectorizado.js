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

//puntos prueba 
const puntos = [
    new Punto(0, 0),
    new Punto(2, 1),
    new Punto(1, 2),
    new Punto(0, 2),
    new Punto(-1, 1),
    new Punto(-1, -1)
];


function calcularCentroide(puntos) {
    let xSum = 0, ySum = 0;
    puntos.forEach(p => {
        xSum += p.x;
        ySum += p.y;
    });
    return new Punto(xSum / puntos.length, ySum / puntos.length);
}


function ordenarPuntos(puntos, centroide) {
    return puntos.slice().sort((a, b) => {
        const angA = Math.atan2(a.y - centroide.y, a.x - centroide.x);
        const angB = Math.atan2(b.y - centroide.y, b.x - centroide.x);
        return angA - angB;
    });
}


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


let centroideVisible = false;
function toggleCentroid() {
    const svg = document.getElementById("vectorCanvas");
    svg.innerHTML = ""; 
    dibujarPoligono(puntos);

    if (!centroideVisible) {
        dibujarCentroide(puntos);
    }
    centroideVisible = !centroideVisible;
}

dibujarPoligono(puntos);
