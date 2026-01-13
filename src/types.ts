export interface Seat {
  number: number;
  status: 'available' | 'skipped' | 'pinned';
}

export interface Row {
  id: number;
  name: string;
  aisles: number;
  seats: Seat[];
}

export interface Section {
  id: number;
  name: string;
  color: string;
  curve: number;
  skew: number;
  seatSize: number;
  seatGap: number;
  rowIndex: number;
  rows: Row[];
}

export type Tool = 'select' | 'skip' | 'pin';
