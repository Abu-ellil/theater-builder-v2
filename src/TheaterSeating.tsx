
import React, { useState } from 'react';

// Types
export interface Seat {
  number: number;
  status: 'available' | 'booked' | 'selected' | 'skipped' | 'pinned';
}

export interface Section {
  id: number;
  name: string;
  color: string;
  price: number;
  rows: Row[];
  x: number;
  y: number;
  rotation: number;
  skew: number;
  curve: number;
  seatSize: number;
  seatGap: number;
  rowGap: number;
  hasBorder: boolean;
  pathD?: string;
  svgDim?: { width: number, height: number };
}

export interface Row {
  id: number;
  name: string;
  seats: Seat[];
  aisles: number;
}

interface TheaterProps {
  onSeatClick?: (section: Section, row: Row, seat: Seat) => void;
  selectedSeats?: string[]; // Array of unique IDs e.g. "sec-row-seat"
  pricing?: Record<string, number>; // Dynamic pricing map keyed by section ID
}

const THEATER_DATA: Section[] = [
  {
    "id": 1768267855859,
    "name": "--",
    "color": "#a855f7",
    "price": 10006.42,
    "curve": 57,
    "skew": 0,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 462.3069654454428,
    "y": 341.76914262458166,
    "rows": [
      {
        "id": 1768271099696,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271100637,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 6.450000000000001 Q 30 6.450000000000001 88.5 10.725000000000001 Q 147 15 205.5 10.725000000000001 Q 264 6.450000000000001 264 18.950000000000003 Q 264 31.450000000000003 264 44.95 Q 264 58.45 264 71.95 Q 264 85.45 205.5 89.725 Q 147 94 88.5 89.725 Q 30 85.45 30 71.95 Q 30 58.45 30 44.95 Z",
    "svgDim": {
      "width": 294,
      "height": 109
    }
  },
  {
    "id": 1768266386999,
    "name": "VIP",
    "color": "#ef4444",
    "price": 10673.52,
    "curve": 203,
    "skew": 1,
    "seatSize": 16,
    "seatGap": 6,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 248.07920385346702,
    "y": 225.85106849297975,
    "rows": [
      {
        "id": 1768266569277,
        "name": "B",
        "aisles": 2,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "skipped"
          },
          {
            "number": 13,
            "status": "skipped"
          },
          {
            "number": 14,
            "status": "skipped"
          },
          {
            "number": 15,
            "status": "skipped"
          },
          {
            "number": 16,
            "status": "skipped"
          },
          {
            "number": 17,
            "status": "skipped"
          },
          {
            "number": 18,
            "status": "skipped"
          },
          {
            "number": 19,
            "status": "skipped"
          },
          {
            "number": 20,
            "status": "skipped"
          },
          {
            "number": 21,
            "status": "available"
          },
          {
            "number": 22,
            "status": "skipped"
          },
          {
            "number": 23,
            "status": "available"
          },
          {
            "number": 24,
            "status": "skipped"
          },
          {
            "number": 25,
            "status": "skipped"
          },
          {
            "number": 26,
            "status": "skipped"
          },
          {
            "number": 27,
            "status": "available"
          },
          {
            "number": 28,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768266572289,
        "name": "C",
        "aisles": 2,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "skipped"
          },
          {
            "number": 13,
            "status": "available"
          },
          {
            "number": 14,
            "status": "skipped"
          },
          {
            "number": 15,
            "status": "available"
          },
          {
            "number": 16,
            "status": "skipped"
          },
          {
            "number": 17,
            "status": "skipped"
          },
          {
            "number": 18,
            "status": "skipped"
          },
          {
            "number": 19,
            "status": "skipped"
          },
          {
            "number": 20,
            "status": "skipped"
          },
          {
            "number": 21,
            "status": "available"
          },
          {
            "number": 22,
            "status": "skipped"
          },
          {
            "number": 23,
            "status": "available"
          },
          {
            "number": 24,
            "status": "available"
          },
          {
            "number": 25,
            "status": "skipped"
          },
          {
            "number": 26,
            "status": "skipped"
          },
          {
            "number": 27,
            "status": "available"
          },
          {
            "number": 28,
            "status": "skipped"
          }
        ]
      }
    ],
    "rowGap": 11,
    "pathD": "M 30 -15.449999999999996 Q 30 -15.449999999999996 193.5 -0.22499999999999787 Q 357 15 520.5 -0.22499999999999787 Q 684 -15.449999999999996 684 -2.9499999999999957 Q 684 9.550000000000004 684 23.050000000000004 Q 684 36.550000000000004 684 50.050000000000004 Q 684 63.550000000000004 520.5 78.775 Q 357 94 193.5 78.775 Q 30 63.550000000000004 30 50.050000000000004 Q 30 36.550000000000004 30 23.050000000000004 Z",
    "svgDim": {
      "width": 714,
      "height": 109
    }
  },
  {
    "id": 1768267392236,
    "name": "ROYAL",
    "color": "#a855f7",
    "price": 10006.42,
    "curve": 268,
    "skew": 0,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 221.63961927303237,
    "y": 303.6642572272283,
    "rows": [
      {
        "id": 1768271042851,
        "name": "B",
        "aisles": 2,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          },
          {
            "number": 13,
            "status": "available"
          },
          {
            "number": 14,
            "status": "available"
          },
          {
            "number": 15,
            "status": "available"
          },
          {
            "number": 16,
            "status": "available"
          },
          {
            "number": 17,
            "status": "available"
          },
          {
            "number": 18,
            "status": "available"
          },
          {
            "number": 19,
            "status": "available"
          },
          {
            "number": 20,
            "status": "available"
          },
          {
            "number": 21,
            "status": "available"
          },
          {
            "number": 22,
            "status": "available"
          },
          {
            "number": 23,
            "status": "available"
          },
          {
            "number": 24,
            "status": "available"
          },
          {
            "number": 25,
            "status": "available"
          },
          {
            "number": 26,
            "status": "available"
          },
          {
            "number": 27,
            "status": "available"
          },
          {
            "number": 28,
            "status": "available"
          },
          {
            "number": 29,
            "status": "available"
          },
          {
            "number": 30,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 -25.200000000000003 Q 30 -25.200000000000003 204.5 -5.100000000000001 Q 379 15 553.5 -5.100000000000001 Q 728 -25.200000000000003 728 -12.700000000000003 Q 728 -0.20000000000000284 728 13.299999999999997 Q 728 26.799999999999997 553.5 46.9 Q 379 67 204.5 46.9 Q 30 26.799999999999997 30 13.299999999999997 Z",
    "svgDim": {
      "width": 758,
      "height": 82
    }
  },
  {
    "id": 1768267667082,
    "name": "PLATINUM",
    "color": "#3b82f6",
    "price": 8205.27,
    "curve": 57,
    "skew": -11,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": -12,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 695.1038102930703,
    "y": 320.5608346422037,
    "rows": [
      {
        "id": 1768267680811,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768267683427,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768267683944,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "skipped"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768267684256,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      }
    ],
    "pathD": "M 30 6.450000000000001 Q 30 6.450000000000001 88.5 10.725000000000001 Q 147 15 205.5 10.725000000000001 Q 264 6.450000000000001 264 18.950000000000003 Q 264 31.450000000000003 264 44.95 Q 264 58.45 264 71.95 Q 264 85.45 264 98.95 Q 264 112.45 264 125.94999999999999 Q 264 139.45 205.5 143.725 Q 147 148 88.5 143.725 Q 30 139.45 30 125.94999999999999 Q 30 112.45 30 98.95 Q 30 85.45 30 71.95 Q 30 58.45 30 44.95 Z",
    "svgDim": {
      "width": 294,
      "height": 163
    }
  },
  {
    "id": 1768268079449,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 57,
    "skew": 11,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 10,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 212.96644765570773,
    "y": 435.84807517944427,
    "rows": [
      {
        "id": 1768268079449.9526,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268079449.0835,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268079449.917,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268079449.1313,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 6.450000000000001 Q 30 6.450000000000001 88.5 10.725000000000001 Q 147 15 205.5 10.725000000000001 Q 264 6.450000000000001 264 18.950000000000003 Q 264 31.450000000000003 264 44.95 Q 264 58.45 264 71.95 Q 264 85.45 264 98.95 Q 264 112.45 264 125.94999999999999 Q 264 139.45 205.5 143.725 Q 147 148 88.5 143.725 Q 30 139.45 30 125.94999999999999 Q 30 112.45 30 98.95 Q 30 85.45 30 71.95 Q 30 58.45 30 44.95 Z",
    "svgDim": {
      "width": 294,
      "height": 163
    }
  },
  {
    "id": 1768268156061,
    "name": "DIAMOND",
    "color": "#494a99",
    "price": 8672.23,
    "curve": 89,
    "skew": -1,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 458.5336046652107,
    "y": 409.18660678626094,
    "rows": [
      {
        "id": 1768271131665,
        "name": "F",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271132716,
        "name": "G",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271133124,
        "name": "H",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271135761,
        "name": "I",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271136029,
        "name": "J",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 1.6500000000000004 Q 30 1.6500000000000004 88.5 8.325 Q 147 15 205.5 8.325 Q 264 1.6500000000000004 264 14.149999999999999 Q 264 26.65 264 40.15 Q 264 53.65 264 67.15 Q 264 80.65 264 94.15 Q 264 107.65 264 121.15 Q 264 134.65 264 148.15 Q 264 161.65 205.5 168.325 Q 147 175 88.5 168.325 Q 30 161.65 30 148.15 Q 30 134.65 30 121.15 Q 30 107.65 30 94.15 Q 30 80.65 30 67.15 Q 30 53.65 30 40.15 Z",
    "svgDim": {
      "width": 294,
      "height": 190
    }
  },
  {
    "id": 1768268404468,
    "name": "SILVER",
    "color": "#94a3b8",
    "price": 5000,
    "curve": 57,
    "skew": -20,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": -16,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 699.1700409760361,
    "y": 551.4926849196293,
    "rows": [
      {
        "id": 1768268417703,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268421822,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268422073,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268422351,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271325285,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 6.450000000000001 Q 30 6.450000000000001 88.5 10.725000000000001 Q 147 15 205.5 10.725000000000001 Q 264 6.450000000000001 264 18.950000000000003 Q 264 31.450000000000003 264 44.95 Q 264 58.45 264 71.95 Q 264 85.45 264 98.95 Q 264 112.45 264 125.94999999999999 Q 264 139.45 264 152.95 Q 264 166.45 205.5 170.725 Q 147 175 88.5 170.725 Q 30 166.45 30 152.95 Q 30 139.45 30 125.94999999999999 Q 30 112.45 30 98.95 Q 30 85.45 30 71.95 Q 30 58.45 30 44.95 Z",
    "svgDim": {
      "width": 294,
      "height": 190
    }
  },
  {
    "id": 1768268511091,
    "name": "SILVER",
    "color": "#94a3b8",
    "price": 5000,
    "curve": 89,
    "skew": 9,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 11,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 218.67545223144734,
    "y": 561.2232044001487,
    "rows": [
      {
        "id": 1768268511091.1995,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268511091.6548,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268511091.3337,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768268511091.5051,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271899989,
        "name": "E",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 1.6500000000000004 Q 30 1.6500000000000004 88.5 8.325 Q 147 15 205.5 8.325 Q 264 1.6500000000000004 264 14.149999999999999 Q 264 26.65 264 40.15 Q 264 53.65 264 67.15 Q 264 80.65 264 94.15 Q 264 107.65 264 121.15 Q 264 134.65 264 148.15 Q 264 161.65 205.5 168.325 Q 147 175 88.5 168.325 Q 30 161.65 30 148.15 Q 30 134.65 30 121.15 Q 30 107.65 30 94.15 Q 30 80.65 30 67.15 Q 30 53.65 30 40.15 Z",
    "svgDim": {
      "width": 294,
      "height": 190
    }
  },
  {
    "id": 1768268986503,
    "name": "PLATINUM",
    "color": "#3b82f6",
    "price": 8205.27,
    "curve": 41,
    "skew": 6,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": 9,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 219.0843297735899,
    "y": 313.77623035759945,
    "rows": [
      {
        "id": 1768268986503.9639,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768268986503.8271,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768268986503.2993,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "skipped"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "skipped"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      },
      {
        "id": 1768268986503.2927,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "skipped"
          },
          {
            "number": 10,
            "status": "skipped"
          }
        ]
      }
    ],
    "pathD": "M 30 8.850000000000001 Q 30 8.850000000000001 88.5 11.925 Q 147 15 205.5 11.925 Q 264 8.850000000000001 264 21.35 Q 264 33.85 264 47.35 Q 264 60.85 264 74.35 Q 264 87.85 264 101.35 Q 264 114.85 264 128.35 Q 264 141.85 205.5 144.925 Q 147 148 88.5 144.925 Q 30 141.85 30 128.35 Q 30 114.85 30 101.35 Q 30 87.85 30 74.35 Q 30 60.85 30 47.35 Z",
    "svgDim": {
      "width": 294,
      "height": 163
    }
  },
  {
    "id": 1768271779834,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 57,
    "skew": -15,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": -14,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 698.7228579121179,
    "y": 435.00192133329045,
    "rows": [
      {
        "id": 1768271779834.8801,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271779834.8945,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271779834.7314,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271779834.9463,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 6.450000000000001 Q 30 6.450000000000001 88.5 10.725000000000001 Q 147 15 205.5 10.725000000000001 Q 264 6.450000000000001 264 18.950000000000003 Q 264 31.450000000000003 264 44.95 Q 264 58.45 264 71.95 Q 264 85.45 264 98.95 Q 264 112.45 264 125.94999999999999 Q 264 139.45 205.5 143.725 Q 147 148 88.5 143.725 Q 30 139.45 30 125.94999999999999 Q 30 112.45 30 98.95 Q 30 85.45 30 71.95 Q 30 58.45 30 44.95 Z",
    "svgDim": {
      "width": 294,
      "height": 163
    }
  },
  {
    "id": 1768271910983,
    "name": "GOLD",
    "color": "#22d3ee",
    "price": 7004.5,
    "curve": 73,
    "skew": 1,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 11,
    "rotation": -1,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 457.96644765570767,
    "y": 561.6814085127776,
    "rows": [
      {
        "id": 1768271910983.4988,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271910983.308,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "skipped"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271910983.0679,
        "name": "C",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "skipped"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768271910983.3396,
        "name": "D",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "skipped"
          },
          {
            "number": 2,
            "status": "skipped"
          },
          {
            "number": 3,
            "status": "skipped"
          },
          {
            "number": 4,
            "status": "skipped"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 4.050000000000001 Q 30 4.050000000000001 88.5 9.525 Q 147 15 205.5 9.525 Q 264 4.050000000000001 264 16.55 Q 264 29.05 264 42.55 Q 264 56.05 264 69.55 Q 264 83.05 264 96.55 Q 264 110.05 264 123.55000000000001 Q 264 137.05 205.5 142.525 Q 147 148 88.5 142.525 Q 30 137.05 30 123.55000000000001 Q 30 110.05 30 96.55 Q 30 83.05 30 69.55 Q 30 56.05 30 42.55 Z",
    "svgDim": {
      "width": 294,
      "height": 163
    }
  },
  {
    "id": 1768272000979,
    "name": "SILVER",
    "color": "#94a3b8",
    "price": 5000,
    "curve": 89,
    "skew": 0,
    "seatSize": 16,
    "seatGap": 6,
    "rowGap": 7,
    "rotation": 0,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 454.8166752355611,
    "y": 685.9105148050832,
    "rows": [
      {
        "id": 1768272014645,
        "name": "A",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      },
      {
        "id": 1768272023917,
        "name": "B",
        "aisles": 0,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 1.6500000000000004 Q 30 1.6500000000000004 88.5 8.325 Q 147 15 205.5 8.325 Q 264 1.6500000000000004 264 14.149999999999999 Q 264 26.65 264 38.15 Q 264 49.65 264 61.150000000000006 Q 264 72.65 205.5 79.325 Q 147 86 88.5 79.325 Q 30 72.65 30 61.150000000000006 Q 30 49.65 30 38.15 Z",
    "svgDim": {
      "width": 294,
      "height": 101
    }
  },
  {
    "id": 1768272102300,
    "name": "BRONZE",
    "color": "#e2e8f0",
    "price": 3000,
    "curve": 366,
    "skew": 0,
    "seatSize": 16,
    "seatGap": 7,
    "rowGap": 11,
    "rotation": -2,
    "rowIndex": 0,
    "hasBorder": false,
    "x": 212.66282908171493,
    "y": 734.9874378820062,
    "rows": [
      {
        "id": 1768272124276,
        "name": "A",
        "aisles": 2,
        "seats": [
          {
            "number": 1,
            "status": "available"
          },
          {
            "number": 2,
            "status": "available"
          },
          {
            "number": 3,
            "status": "available"
          },
          {
            "number": 4,
            "status": "available"
          },
          {
            "number": 5,
            "status": "available"
          },
          {
            "number": 6,
            "status": "available"
          },
          {
            "number": 7,
            "status": "available"
          },
          {
            "number": 8,
            "status": "available"
          },
          {
            "number": 9,
            "status": "available"
          },
          {
            "number": 10,
            "status": "available"
          },
          {
            "number": 11,
            "status": "available"
          },
          {
            "number": 12,
            "status": "available"
          },
          {
            "number": 13,
            "status": "available"
          },
          {
            "number": 14,
            "status": "available"
          },
          {
            "number": 15,
            "status": "available"
          },
          {
            "number": 16,
            "status": "available"
          },
          {
            "number": 17,
            "status": "available"
          },
          {
            "number": 18,
            "status": "available"
          },
          {
            "number": 19,
            "status": "available"
          },
          {
            "number": 20,
            "status": "available"
          },
          {
            "number": 21,
            "status": "available"
          },
          {
            "number": 22,
            "status": "available"
          },
          {
            "number": 23,
            "status": "available"
          },
          {
            "number": 24,
            "status": "available"
          },
          {
            "number": 25,
            "status": "available"
          },
          {
            "number": 26,
            "status": "available"
          },
          {
            "number": 27,
            "status": "available"
          },
          {
            "number": 28,
            "status": "available"
          },
          {
            "number": 29,
            "status": "available"
          },
          {
            "number": 30,
            "status": "available"
          }
        ]
      }
    ],
    "pathD": "M 30 -39.900000000000006 Q 30 -39.900000000000006 211.75 -12.450000000000003 Q 393.5 15 575.25 -12.450000000000003 Q 757 -39.900000000000006 757 -27.400000000000006 Q 757 -14.900000000000006 757 -1.4000000000000057 Q 757 12.099999999999994 575.25 39.55 Q 393.5 67 211.75 39.55 Q 30 12.099999999999994 30 -1.4000000000000057 Z",
    "svgDim": {
      "width": 787,
      "height": 82
    }
  }
];

export const TheaterSeating: React.FC<TheaterProps> = ({ 
  onSeatClick, 
  selectedSeats = [],
  pricing = {} 
}) => {
  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const isZoomedIn = zoom > 1.1;
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom(z => Math.max(0.3, Math.min(3, z + delta)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).tagName === 'SVG' || (e.target as HTMLElement).id === 'zoom-container') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSectionClick = (e: React.MouseEvent, section: Section) => {
      e.stopPropagation(); // Prevent canvas drag/pan triggers
      if (!containerRef.current) return;
      
      const cw = containerRef.current.clientWidth;
      const ch = containerRef.current.clientHeight;
      const targetZoom = 1.5;

      // Center logic for transform-origin: top center
      const newPanX = -1 * (section.x - cw / 2) * targetZoom;
      const newPanY = (ch / 2) - (section.y * targetZoom);

      setZoom(targetZoom);
      setPan({ x: newPanX, y: newPanY });
  };

  return (
    <div 
        ref={containerRef}
        className="relative w-full h-[800px] overflow-hidden bg-gray-900 rounded-xl"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Toolbar */}
      <div className="absolute top-4 right-4 z-50 flex gap-2 bg-white/10 p-2 rounded-lg backdrop-blur">
        <button onClick={() => setZoom(z => Math.min(z + 0.1, 3))} className="p-2 text-white hover:bg-white/20 rounded">+</button>
        <button onClick={() => setZoom(z => Math.max(z - 0.1, 0.3))} className="p-2 text-white hover:bg-white/20 rounded">-</button>
      </div>

      {/* Canvas */}
      <div 
           id="zoom-container"
           className="origin-top-center transition-transform duration-75 ease-out"
           style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, minHeight: '100%', width: '100%' }}>
            
        {THEATER_DATA.map(section => {
          const currentPrice = pricing[section.id] ?? section.price;
          
          return (
            <div 
              key={section.id}
              onClick={(e) => handleSectionClick(e, section)}
              className="absolute flex flex-col items-center select-none transition-all duration-200 hover:brightness-110 cursor-pointer"
              style={{
                left: section.x,
                top: section.y,
                transform: `skewX(${section.skew}deg) rotate(${section.rotation}deg)`,
                gap: section.rowGap
              }}
            >
              {/* Section Shape (Border + Fill) */}
              <svg 
                  width={section.svgDim?.width} 
                  height={section.svgDim?.height} 
                  className="absolute pointer-events-none overflow-visible"
                  style={{ top: -15, left: '50%', transform: 'translateX(-50%)' }}
                >
                  <path 
                    d={section.pathD} 
                    fill={section.color}
                    // If zoomed in: transparent fill. If zoomed out: strong opacity
                    fillOpacity={isZoomedIn ? 0 : 0.6}
                    stroke={section.hasBorder ? section.color : 'none'} 
                    strokeWidth="3" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="transition-all duration-300"
                  />
                  {/* Centered Label for Overview */}
                  <text 
                    x={section.svgDim?.width ? section.svgDim.width / 2 : 50} 
                    y={section.svgDim?.height ? section.svgDim.height / 2 : 50} 
                    fill="white"
                    fontSize={Math.max(20, (section.svgDim?.width || 0)/10)}
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={`transition-opacity duration-300 pointer-events-none drop-shadow-md ${!isZoomedIn ? 'opacity-100' : 'opacity-0'}`}
                  >
                    {section.name}
                  </text>
                </svg>

              {/* Rows - Hide when zoomed out */}
              <div 
                className={`relative z-10 flex flex-col items-center pt-2.5 transition-opacity duration-300 ${isZoomedIn ? 'opacity-100' : 'opacity-0'}`} 
                style={{ gap: section.rowGap }}
              >
                {section.rows.map(row => (
                  <div key={row.id} className="flex items-center" style={{ gap: 3 }}>
                    <div className="flex justify-center" style={{ gap: section.seatGap }}>
                      {renderRowSeats(section, row, currentPrice, onSeatClick, selectedSeats, section.seatGap)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper to render seats with aisles
function renderRowSeats(
    section: Section, 
    row: Row, 
    price: number,
    onClick: any,
    selectedIds: string[],
    gap: number
) {
  const seats = row.seats;
  const aisles = row.aisles || 0;
  
  if (aisles > 0) {
    // Group seats by aisle
    const groups: React.ReactNode[] = [];
    const groupSize = Math.ceil(seats.length / (aisles + 1));
    
    for (let i = 0; i < seats.length; i += groupSize) {
      const chunk = seats.slice(i, i + groupSize);
      groups.push(
        <div key={i} className="flex" style={{ gap }}>
          {chunk.map((seat, idx) => renderSeat(section, row, seat, i + idx, seats.length, price, onClick, selectedIds))}
        </div>
      );
      if (i + groupSize < seats.length) {
         groups.push(<div key={`aisle-${i}`} style={{ width: 12 }} />);
      }
    }
    return groups;
  }
  
  return seats.map((seat, i) => renderSeat(section, row, seat, i, seats.length, price, onClick, selectedIds));
}

function renderSeat(
    section: Section, 
    row: Row, 
    seat: Seat, 
    index: number, 
    total: number,
    price: number,
    onClick: any,
    selectedIds: string[]
) {
    if (seat.status === 'skipped') {
       return (
         <div 
           key={seat.number} 
           className="rounded-none bg-gray-700 opacity-40"
           style={{ width: section.seatSize, height: section.seatSize }} 
         />
       );
    }

    const uniqueId = `${section.id}-${row.id}-${seat.number}`;
    const isSelected = selectedIds.includes(uniqueId) || seat.status === 'selected';
    const isBooked = seat.status === 'booked';
    
    // Curve transform
    let transform = '';
    if (section.curve > 0) {
        const intensity = section.curve / 100;
        const normalized = total > 1 ? (index - (total - 1) / 2) / ((total - 1) / 2) : 0;
        const yOffset = Math.pow(normalized, 2) * intensity * 15;
        const rotation = normalized * intensity * 8;
        transform = `translateY(-${yOffset}px) rotate(${rotation}deg)`;
    }

    return (
        <div
            key={seat.number}
            onClick={() => !isBooked && onClick && onClick(section, row, seat)}
            title={`Seat ${seat.number} - ${price}`}
            className={`
                flex items-center justify-center rounded-none text-center
                cursor-pointer transition-transform hover:scale-125 hover:z-50
                ${isBooked ? 'bg-gray-700 opacity-50 cursor-not-allowed' : ''}
            `}
            style={{
                width: section.seatSize,
                height: section.seatSize,
                fontSize: Math.max(7, Math.floor(section.seatSize * 0.4)),
                transform,
                backgroundColor: isSelected ? 'white' : (isBooked ? undefined : section.color),
                border: isSelected ? `2px solid ${section.color}` : 'none',
                color: isSelected ? section.color : 'white',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
            }}
        >
            {isSelected ? '✓' : seat.number}
        </div>
    );
}

export default TheaterSeating;
