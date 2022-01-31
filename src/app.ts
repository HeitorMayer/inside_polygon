import { PointsCollector } from "./PointsCollector"
import { Polygon } from "./Poligono"
import { Point } from "./Point" 

const canvas = document.getElementById("polygonCanvas") as HTMLCanvasElement;
let pointsCollector = new PointsCollector(canvas);
const btnBuildPolygon = document.getElementById("btnBuildPolygon") as HTMLCanvasElement;
const btnReset = document.getElementById("btnReset") as HTMLCanvasElement;
let collecting = true;
let polygon: Polygon | null = null;

function showMessagePointIsInside() {
    let outsideMsg: HTMLDivElement | null = document.getElementById("outsideMsg") as HTMLDivElement;
    let insideMsg: HTMLDivElement | null = document.getElementById("insideMsg") as HTMLDivElement;
    outsideMsg.style['display'] = "none";
    insideMsg.style['display'] = "block";
}

function showMessagePointIsOutside() {
    let outsideMsg: HTMLDivElement | null = document.getElementById("outsideMsg") as HTMLDivElement;
    let insideMsg: HTMLDivElement | null = document.getElementById("insideMsg") as HTMLDivElement;
    outsideMsg.style['display'] = "block";
    insideMsg.style['display'] = "none";
}

function clearMessages() {
    let outsideMsg: HTMLDivElement | null = document.getElementById("outsideMsg") as HTMLDivElement;
    let insideMsg: HTMLDivElement | null = document.getElementById("insideMsg") as HTMLDivElement;
    outsideMsg.style['display'] = "none";
    insideMsg.style['display'] = "none";
}


canvas.addEventListener("mousedown", function(e) {

    if(collecting) {
        pointsCollector.collectPoint(e);
    }else { 
        //I am checking if the points are inside or outside
        if (polygon != null) {
            const point = pointsCollector.getPoint(e);
            if (polygon.isPointInside(point)) {
                showMessagePointIsInside();
            }else {
                showMessagePointIsOutside();
            }
        }
    }
    
});

btnBuildPolygon.addEventListener("click", function(e) {
    let vertices: Point[] = pointsCollector.vertices;
    polygon = new Polygon(canvas, vertices)
    polygon.draw();
    collecting = false;
});

btnReset.addEventListener("click", function(e) {
    const ctx = canvas.getContext("2d");
    if (ctx != null) {
        ctx.clearRect(0, 0, canvas.width, canvas. height);
    }
    clearMessages();
    pointsCollector.reset();
    collecting = true;
});

