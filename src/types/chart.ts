export interface LineDataPoint {
  x: Date;
  y: number;
}

export interface CandleDataPoint {
  x: Date;
  open: number;
  close: number;
  high: number;
  low: number;
}
