export interface Box {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  colorId: string;
}

export interface movingBox {
  boxId: number;
  localX: number;
  localY: number;
}
