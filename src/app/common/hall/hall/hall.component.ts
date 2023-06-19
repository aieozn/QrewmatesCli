import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { RestaurantTableGet } from '@common/api-client/models';
import { CanvasTable } from './elements/canvas-table';
import { CanvasUtils } from './canvas-utils';

@Component({
  selector: 'app-hall',
  templateUrl: './hall.component.html',
  styleUrls: ['./hall.component.scss']
})
export class HallComponent implements OnInit {
  @ViewChild('canvas', { static: true }) 
  canvas: ElementRef<HTMLCanvasElement> | undefined;

  @ViewChild('canvasWrapper', { static: true }) 
  canvasWrapper!: ElementRef;

  @Input() set tables(value: RestaurantTableGet[]) {
    this._tables = value.map(e => new CanvasTable(e));
    this.draw(this._tables)
  }

  @Output('onTableUpdate') onTableUpdate = new EventEmitter<RestaurantTableGet>();
  @Output('onTableClick') onTableClick = new EventEmitter<RestaurantTableGet>();

  canvasUtils: CanvasUtils | undefined;
  _tables: CanvasTable[] = [];

  mouseDown = false
  selectedTable: {
    table: CanvasTable,
    initialLogicX: number,
    initialLogicY: number,
    realMoveX: number,
    realMoveY: number
  } | undefined;

  ngOnInit(): void {
    this.canvas!.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.canvas!.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this))
    this.canvas!.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this))
    this.canvas!.nativeElement.addEventListener('mouseout', this.onMouseUp.bind(this))

    this.canvasUtils = new CanvasUtils(this.canvas!)
    this.canvasUtils.setTables(this._tables)
    this.draw(this._tables)
  }

  @HostListener('window:resize')
  onResize() {
    if (this.canvasUtils) {
      this.canvasUtils.resize(this._tables)
      this.draw(this._tables)
    }
  }

  private draw(tables: CanvasTable[]) {
    if (this.canvasUtils) {
      this.canvasUtils.update(tables)
  
      for (const table of tables) {
        table.draw(this.canvasUtils);
      }
    }
  }

  private onMouseMove(e: MouseEvent) {
    const canvasRect = this.canvasWrapper.nativeElement.getBoundingClientRect() as DOMRect;
    const x = e.clientX - canvasRect.left
    const y = e.clientY - canvasRect.top

    if (this.mouseDown) {
      if (this.selectedTable) {
        this.moveTable(this.selectedTable, e.movementX, e.movementY)
      } else {
        this.canvasUtils!.moveLogicSpace(e.movementX, e.movementY)
        this.draw(this._tables)
      }
    }

    const tableHover = this.findTable(
      this.canvasUtils!.realPosXToLogicPosX(x),
      this.canvasUtils!.realPosYToLogicPosY(y)
    )
    
    if (tableHover !== undefined) {
      this.canvas!.nativeElement.style.cursor = 'pointer';
    } else {
      this.canvas!.nativeElement.style.cursor = 'default';
    }
  }

  private moveTable(table: {
    table: CanvasTable,
    initialLogicX: number,
    initialLogicY: number,
    realMoveX: number,
    realMoveY: number
  }, moveX: number, moveY: number) {
    table.realMoveX += moveX;
    table.realMoveY += moveY;
    
    const logicMoveX = Math.floor(this.canvasUtils!.realLengthToLogicLength(table.realMoveX))
    const logicMoveY = Math.floor(this.canvasUtils!.realLengthToLogicLength(table.realMoveY))

    table.table.x = table.initialLogicX + logicMoveX;
    table.table.y = table.initialLogicY + logicMoveY;

    this.draw(this._tables)
  }

  private onMouseDown(e: MouseEvent) {
    const canvasRect = this.canvasWrapper.nativeElement.getBoundingClientRect() as DOMRect;
    const x = this.canvasUtils!.realPosXToLogicPosX(e.clientX - canvasRect.left)
    const y = this.canvasUtils!.realPosYToLogicPosY(e.clientY - canvasRect.top)
    const table = this.findTable(x, y);

    if (table) {
      this.selectedTable = {
        table,
        initialLogicX: table.x,
        initialLogicY: table.y,
        realMoveX: 0,
        realMoveY: 0
      }
    }
    
    this.mouseDown = true;
  }

  private onMouseUp() {
    this.mouseDown = false;

    if (this.selectedTable && this.selectedTable.realMoveX === 0 && this.selectedTable.realMoveY === 0) {
      this.onTableClick.emit(this.selectedTable.table.getTable())
    }

    if (this.selectedTable && (this.selectedTable.realMoveX !== 0 || this.selectedTable.realMoveY !== 0)) {
      this.onTableUpdate.emit(this.selectedTable.table.getTable())
    }

    this.selectedTable = undefined;
  }

  private findTable(x: number, y: number) : CanvasTable | undefined {
    let found: CanvasTable | undefined;

    for (const table of this._tables) {
      if (x >= table.x && x < table.x + table.width && y >= table.y && y < table.y + table.height) {
        found = table;
      }
    }

    return found;
  }

  zoomIn() {
    this.canvasUtils!.zoom(-2)
    this.draw(this._tables)
  }

  zoomOut() {
    this.canvasUtils!.zoom(2)
    this.draw(this._tables)
  }
}
