import { Point } from "./Point";

export class PointsCollector {
    private _vertices: Point[] = [];
    private _canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this._canvas = canvas 
    }

    public get vertices(): Point[] {
        return this._vertices;
    }

    public collectPoint(event: MouseEvent) {
        let point: Point = this.getPoint(event);
        this.vertices.push(point);
    }

    public getPoint(event: MouseEvent): Point {
        const x = event.offsetX;
        const y = event.offsetY;
        const point = new Point(x,y);
        //draw the point
        const ctx = this._canvas.getContext("2d");
        if (ctx != null) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2* Math.PI);
            ctx.fill();
        }        
        return point;
    }

    public reset() {
        this._vertices = [];
    }


}