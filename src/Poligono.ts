import { Point } from "./Point";
import { LineSegment } from "./LineSegment";

export class Polygon {
    private _canvas: HTMLCanvasElement;
    private _vertices: Point[];
    private _lineSegments: LineSegment[] = [];

    constructor (canvas: HTMLCanvasElement, vertices : Point[]) {
        this._canvas = canvas;
        this._vertices = vertices;
        if (this._vertices.length >= 3) {
            let firstVertex;
            let lastVertex = firstVertex = this._vertices[0];
            for (let i = 0; i < this._vertices.length; i++) {
                let vertex = this._vertices[i];
                this._lineSegments.push(new LineSegment(lastVertex, vertex, canvas));

                lastVertex = vertex;
            }
            this._lineSegments.push(new LineSegment(lastVertex, firstVertex, canvas))
        }
    }

    draw() {
        for (let lineSegment of this._lineSegments) {
            lineSegment.draw();
        }
    }

    isPointInside(point: Point) {
        if (this._lineSegments.length >= 3) {
            let cont = 0;
            for (let lineSegment of this._lineSegments) {
                if (lineSegment.pointIsAbove( point )){
                    cont++;
                }
            }
            return cont % 2 > 0;
        }else {
            return false;
        }
        
    }
}
