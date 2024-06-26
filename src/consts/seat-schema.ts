export type Zone = {
  id: string;
  name: string;
  columns: number;
  rows: number;
  seats: number;
  floor: number;
  invert?: boolean;
  hiddenCells: number[];
};

export const SeatsZonesFloor_1: Zone[] = [
  {
    id: "Z-1",
    name: "1",
    columns: 5,
    rows: 4,
    seats: 20,
    floor: 1,
    hiddenCells: [],
  },
  {
    id: "Z-2",
    name: "2",
    columns: 4,
    rows: 8,
    seats: 32,
    floor: 1,
    hiddenCells: [],
  },
  {
    id: "Z-3",
    name: "3",
    columns: 8,
    rows: 6,
    seats: 42,
    floor: 1,
    hiddenCells: [43, 44, 45, 46, 47, 48],
  },
  {
    id: "Z-4",
    name: "4",
    columns: 8,
    rows: 5,
    seats: 40,
    floor: 1,
    hiddenCells: [],
  },
  {
    id: "Z-5",
    name: "5",
    columns: 8,
    rows: 6,
    seats: 42,
    floor: 1,

    hiddenCells: [41, 42, 43, 44, 45, 46],
  },
  {
    id: "Z-6",
    name: "6",
    columns: 5,
    rows: 8,
    seats: 40,
    floor: 1,
    invert: true,
    hiddenCells: [],
  },
  {
    id: "Z-7",
    name: "7",
    columns: 6,
    rows: 4,
    seats: 24,
    floor: 1,
    invert: true,
    hiddenCells: [],
  },
  {
    id: "Z-8",
    name: "8",
    columns: 6,
    rows: 16,
    seats: 82,
    floor: 1,
    invert: true,
    hiddenCells: [1, 14, 15, 16, 17, 30, 31, 32, 33, 48, 49, 64, 65, 80],
  },
  {
    id: "Z-9",
    name: "9",
    columns: 6,
    rows: 9,
    seats: 47,
    floor: 1,
    invert: true,
    hiddenCells: [7, 8, 9, 18, 27, 36, 45],
  },
  {
    id: "Z-10",
    name: "10",
    columns: 8,
    rows: 6,
    seats: 46,
    floor: 1,
    hiddenCells: [43, 44],
  },
  {
    id: "Z-11",
    name: "11",
    columns: 10,
    rows: 5,
    seats: 48,
    floor: 1,
    hiddenCells: [45],
  },
  {
    id: "Z-12",
    name: "12",
    columns: 10,
    rows: 3,
    seats: 30,
    floor: 1,
    hiddenCells: [],
  },
  {
    id: "Z-13",
    name: "13",
    columns: 10,
    rows: 2,
    seats: 20,
    floor: 1,
    hiddenCells: [],
  },
  {
    id: "Z-14",
    name: "14",
    columns: 12,
    rows: 4,
    seats: 45,
    floor: 1,
    hiddenCells: [11, 12, 40],
  },
  {
    id: "Z-15",
    name: "15",
    columns: 8,
    rows: 4,
    seats: 30,
    floor: 1,
    hiddenCells: [25, 26],
  },
];

export const SeatsZonesFloor_2: Zone[] = [
  {
    id: "Z-16",
    name: "16",
    columns: 8,
    rows: 6,
    seats: 42,
    floor: 2,
    hiddenCells: [8, 16, 24, 32, 40],
  },
  {
    id: "Z-17",
    name: "17",
    columns: 10,
    rows: 6,
    seats: 42,
    floor: 2,
    hiddenCells: [9, 10, 29, 30, 39, 40, 49, 50, 59, 60],
  },
  {
    id: "Z-18",
    name: "18",
    columns: 14,
    rows: 6,
    seats: 66,
    floor: 2,
    hiddenCells: [
      10, 11, 12, 13, 14, 24, 25, 26, 27, 28, 38, 39, 40, 41, 42, 52, 53, 54,
      55, 56, 68, 69, 70,
    ],
  },
  {
    id: "Z-19",
    name: "19",
    columns: 17,
    rows: 6,
    seats: 82,
    floor: 2,
    hiddenCells: [
      14, 15, 16, 17, 31, 32, 33, 34, 48, 49, 50, 51, 65, 66, 67, 68, 82, 83,
      84, 85,
    ],
  },
  {
    id: "Z-20",
    name: "20",
    columns: 10,
    rows: 4,
    seats: 27,
    floor: 2,
    hiddenCells: [4, 5, 6, 7, 8, 9, 10, 17, 18, 19, 20, 29, 30],
  },
  {
    id: "Z-21",
    name: "21",
    columns: 6,
    rows: 15,
    seats: 45,
    floor: 2,
    invert: true,
    hiddenCells: [
      11, 12, 13, 14, 15, 27, 28, 29, 30, 42, 43, 44, 45, 57, 58, 59, 60, 72,
      73, 74, 75,
    ],
  },
  {
    id: "Z-22",
    name: "22",
    columns: 6,
    rows: 12,
    seats: 62,
    floor: 2,
    invert: true,
    hiddenCells: [11, 12, 23, 24, 35, 36, 47, 48, 59, 60],
  },
];
