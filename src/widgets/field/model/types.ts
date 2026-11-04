export interface Box {
  id: number;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
}

export interface movingBox {
  boxId: number;
  localX: number;
  localY: number;
}
