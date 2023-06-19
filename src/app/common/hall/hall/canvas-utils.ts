import { ElementRef } from "@angular/core";
import { CanvasTable } from "./elements/canvas-table";

export class CanvasUtils {
    private viewLogicWidth = 50;
    private realWidth!: number;
    private realHeight!: number;

    private rangeLogicTopY = 0;
    private rangeLogicWidth = 0;
    private rangeLogicLeftX = 0;
    private rangeLogicHeight = 0;

    private viewLogicTopY = 0;
    private viewLogicHeight = 10;
    private viewLogicLeftX = 0;

    private readonly defaultViewLength = 10;
    private readonly activeViewLength = this.defaultViewLength;

    constructor(private canvas: ElementRef<HTMLCanvasElement>) {
        this.realHeight = this.canvas!.nativeElement.offsetHeight;
        this.realWidth = this.canvas!.nativeElement.offsetWidth;
    }

    zoom(zoomDiff: number) {
        const minZoom = 4
        const widthDiff = (zoomDiff * 2) * (this.realWidth / this.realHeight);

        if (this.viewLogicHeight < this.viewLogicWidth) {
            if (
            this.viewLogicHeight + zoomDiff * 2 > this.rangeLogicHeight
            ||
            this.viewLogicHeight + zoomDiff * 2 < minZoom
            ) {
            return;
            }
        } else {
            if (
            this.viewLogicWidth + widthDiff > this.rangeLogicWidth
            ||
            this.viewLogicWidth + widthDiff < minZoom
            ) {
            return;
            }
        }

        this.viewLogicTopY -= zoomDiff
        this.viewLogicHeight += zoomDiff * 2

        this.viewLogicWidth += widthDiff;
        this.viewLogicLeftX -= widthDiff / 2
    }

    public setTables(tables: CanvasTable[]) {
        this.calcDimensions(tables);
    }

    public resize(tables: CanvasTable[]) {
        this.realHeight = this.canvas!.nativeElement.offsetHeight;
        this.realWidth = this.canvas!.nativeElement.offsetWidth;
        
        this.calcDimensions(tables);
    }

    public drawBackgroundLines() {
        for (let x = Math.ceil(this.viewLogicLeftX); x <= Math.floor(this.getLogicRightX()); x++) {
        this.drawLine(this.logicPosXToRealPosX(x), 0, this.logicPosXToRealPosX(x), this.realHeight, 0.1);
        }

        for (let y = Math.ceil(this.viewLogicTopY); y <= Math.floor(this.getLogicBottomY()); y++) {
        this.drawLine(0, this.logicPosYToRealPosY(y), this.realWidth, this.logicPosYToRealPosY(y), 0.1);
        }

        // Draw range lines
        this.drawLine(
            this.logicPosXToRealPosX(this.rangeLogicLeftX), 
            this.logicPosYToRealPosY(this.rangeLogicTopY),
            this.logicPosXToRealPosX(this.rangeLogicLeftX + this.rangeLogicWidth), 
            this.logicPosYToRealPosY(this.rangeLogicTopY), 2);

        this.drawLine(
            this.logicPosXToRealPosX(this.rangeLogicLeftX), 
            this.logicPosYToRealPosY(this.rangeLogicTopY),
            this.logicPosXToRealPosX(this.rangeLogicLeftX), 
            this.logicPosYToRealPosY(this.rangeLogicTopY + this.rangeLogicWidth), 2);

        this.drawLine(
            this.logicPosXToRealPosX(this.rangeLogicLeftX), 
            this.logicPosYToRealPosY(this.rangeLogicTopY + this.rangeLogicWidth),
            this.logicPosXToRealPosX(this.rangeLogicLeftX + this.rangeLogicWidth), 
            this.logicPosYToRealPosY(this.rangeLogicTopY + this.rangeLogicWidth), 2);

        this.drawLine(
            this.logicPosXToRealPosX(this.rangeLogicLeftX + this.rangeLogicWidth), 
            this.logicPosYToRealPosY(this.rangeLogicTopY),
            this.logicPosXToRealPosX(this.rangeLogicLeftX + this.rangeLogicWidth), 
            this.logicPosYToRealPosY(this.rangeLogicTopY + this.rangeLogicWidth), 2);
    }

    private calcDimensions(tables: CanvasTable[]) {
        this.canvas!.nativeElement.width = this.realWidth;
        this.canvas!.nativeElement.height = this.realHeight;
        
        this.adjustLogicRange(tables);

        const logicRangeCenterX = this.rangeLogicLeftX + (this.rangeLogicWidth / 2);
        const logicRangeCenterY = this.rangeLogicTopY + (this.rangeLogicHeight / 2);

        this.viewLogicTopY = logicRangeCenterY - (this.activeViewLength / 2)
        this.viewLogicHeight = this.activeViewLength

        this.viewLogicWidth = (this.viewLogicHeight) * (this.realWidth / this.realHeight);
        this.viewLogicLeftX = logicRangeCenterX - (this.viewLogicWidth / 2)
    }

    public adjustLogicRange(tables: CanvasTable[]) {
        const defaultRangeMargin = 10;

        if (tables.length > 0) {
            this.rangeLogicTopY = tables[0].y - defaultRangeMargin;
            this.rangeLogicHeight = 2 * defaultRangeMargin + tables[0].height;
            this.rangeLogicLeftX = tables[0].x - defaultRangeMargin;
            this.rangeLogicWidth = 2 * defaultRangeMargin + tables[0].width;

            for (const table of tables) {
            const diffTopY = this.rangeLogicTopY - (table.y - defaultRangeMargin)
            if (diffTopY > 0) {
                this.rangeLogicTopY -= diffTopY;
                this.rangeLogicHeight += diffTopY;
            }

            const diffLeftX = this.rangeLogicLeftX - (table.x - defaultRangeMargin);
            if (diffLeftX > 0) {
                this.rangeLogicLeftX -=  diffLeftX;
                this.rangeLogicWidth += diffLeftX;
            }

            const diffBottomY = (table.y + defaultRangeMargin + table.height) - (this.rangeLogicTopY + this.rangeLogicHeight)
            if (diffBottomY > 0) {
                this.rangeLogicHeight += diffBottomY;
            }

            const diffRightX = (table.x + defaultRangeMargin + table.width) - (this.rangeLogicLeftX + this.rangeLogicWidth);
            if (diffRightX > 0) {
                this.rangeLogicWidth += diffRightX;
            }
            }
        } else {
            this.rangeLogicTopY = -10;
            this.rangeLogicWidth = 20;
            this.rangeLogicLeftX = -10;
            this.rangeLogicWidth = 20;
        }
    }

    public moveLogicSpace(moveXpx: number, moveYpx: number) {
        const moveX = this.realLengthToLogicLength(moveXpx)
        const moveY = this.realLengthToLogicLength(moveYpx)

        // Disable move when view exceeds range
        if (
            (moveY > 0 && this.getLogicBottomY() - moveY > this.rangeLogicTopY)
            ||
            (moveY < 0 && this.viewLogicTopY - moveY < this.rangeLogicTopY + this.rangeLogicHeight)
        ) {
            this.viewLogicTopY -= moveY;
        }
        
        // Disable move when view exceeds range
        if (
            (moveX > 0 && this.getLogicRightX() - moveX > this.rangeLogicLeftX)
            ||
            (moveX < 0 && this.viewLogicLeftX - moveX < this.rangeLogicLeftX + this.rangeLogicWidth)
        ) {
            this.viewLogicLeftX -= moveX;
        }
    }

    public fillRect(x: number, y: number, width: number, height: number, color: string) {
        const ctx = this.canvas!.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.fillRect(
            this.logicPosXToRealPosX(x),
            this.logicPosYToRealPosY(y),
            this.logicLengthToRealLength(width),
            this.logicLengthToRealLength(height)
        );
    }

    private drawLine(bX: number, bY: number, eX: number, eY: number, thicness: number) {
        const ctx = this.canvas!.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        ctx.beginPath();
        ctx.moveTo(bX, bY);
        ctx.lineTo(eX, eY);
        ctx.lineWidth = thicness
        ctx.stroke();
    }

    public clear() {
        const ctx = this.canvas!.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, this.canvas!.nativeElement.width, this.canvas!.nativeElement.height);
    }


    public realPosXToLogicPosX(x: number) : number {
        return this.viewLogicLeftX + (x / this.realWidth) * (this.viewLogicWidth);
    }

    public realPosYToLogicPosY(y: number) : number {
        return this.viewLogicTopY + (y / this.realHeight) * (this.viewLogicHeight);
    }

    private logicPosXToRealPosX(x: number) : number {
        return this.realWidth * ((x - this.viewLogicLeftX) / (this.viewLogicWidth));
    }

    private logicPosYToRealPosY(y: number) : number {
        return this.realHeight * ((y - this.viewLogicTopY) / (this.viewLogicHeight));
    }

    public logicLengthToRealLength(value: number) : number {
        return value / (this.viewLogicWidth / this.realWidth);
    }

    public realLengthToLogicLength(value: number) : number {
        return (value / this.realWidth) * this.viewLogicWidth;
    }

    private getLogicRightX() : number {
        return this.viewLogicLeftX + this.viewLogicWidth;
    }

    private getLogicBottomY() : number {
        return this.viewLogicTopY + this.viewLogicHeight;
    }

    public writeText(value: string, color: string, x: number, y: number, width: number, height: number) {
        const ctx = this.canvas!.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        let fontSize = 20;
        let foneMeasure: TextMetrics;
        do {
            fontSize -= 0.5;
            ctx.font = fontSize + "px Poppins";
            foneMeasure = ctx.measureText(value)
        } while (foneMeasure.width > this.logicLengthToRealLength(width))


        ctx.fillStyle = color
        ctx.font = fontSize + "px Poppins";
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(value, this.logicPosXToRealPosX(x + width / 2), this.logicPosYToRealPosY(y + height / 2));
    }
}