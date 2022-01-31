import { Point } from "./Point"

export class LineSegment {
    private _A: Point;
    private _B: Point;
    private _canvas: HTMLCanvasElement;

    constructor(pointA: Point, pointB: Point, canvas: HTMLCanvasElement) {
        this._A = pointA;
        this._B = pointB;
        this._canvas = canvas;
    }

    public get A() {
        return this._A
    }

    public get B() {
        return this._B
    }

    public draw() {
        const ctx = this._canvas.getContext("2d");
        if (ctx) {
            ctx.moveTo(this.A.x, this._A.y);
            ctx.lineTo(this.B.x, this._B.y);
            ctx.stroke();
        }

    }

    public pointIsAbove(pointP: Point){

        //melhoria para tratar casos de retas paralelas
            if( ((this._B.x - this._A.x) == 0) && (pointP.x != this._A.x) ) {
                 return false;   
            }
        //fim da melhoria para tratar casos de retas paralelas

        const m = (this._B.y - this._A.y) / (this._B.x - this._A.x);
        const pointBetaY = m * pointP.x - m * this._A.x + this._A.y;
        const pointBetaX = pointP.x;

        const t1 = pointBetaY - pointP.y;
        if (t1 < 0) {
            return false;
        }

        const t2 = (pointBetaX - this._A.x) / (this._B.x - this._A.x);
        return t2 >= 0 && t2 <= 1;
    }

}