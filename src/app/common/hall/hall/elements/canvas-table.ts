import { RestaurantTableGet } from "@common/api-client/models";
import { CanvasUtils } from "../canvas-utils";

export class CanvasTable {

    private readonly tableSize = 2;

    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public text: string;

    constructor(private table: RestaurantTableGet) {
        this.x = table.posX;
        this.y = table.posY;
        this.width = this.tableSize;
        this.height = this.tableSize;

        this.text = table.name;
    }

    public draw(canvasUtils: CanvasUtils) {
        canvasUtils.fillRect(
            this.x,
            this.y,
            this.width,
            this.height,
            '#522c23'
        );

        canvasUtils.fillRect(
            this.x + this.width * 0.1,
            this.y + this.height * 0.1,
            this.width - this.width * 0.2,
            this.height - this.height * 0.2,
            '#ffffff'
        );

        canvasUtils.writeText(
            this.text,
            '#000000',
            this.x + this.width * 0.2,
            this.y + this.height * 0.2,
            this.width * 0.6,
            this.height * 0.6
        )
    }

    public getTable() : RestaurantTableGet {
        return {
            ...this.table,
            posX: this.x,
            posY: this.y
        }
    }
}