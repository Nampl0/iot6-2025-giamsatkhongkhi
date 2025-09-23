import { tokens } from "../theme";

export const mockDataActionHistory = [
  {
    id: 1,
    fan: "On",
    light: "On",
    time: "01/12/2024",
  },
  {
    id: 2,
    fan: "On",
    light: "Off",
    time: "01/13/2024",
  },
  {
    id: 3,
    fan: "Off",
    light: "On",
    time: "01/14/2024",
  },
  {
    id: 4,
    fan: "On",
    light: "Off",
    time: "01/15/2024",
  },
  {
    id: 5,
    fan: "Off",
    light: "Off",
    time: "01/16/2024",
  },
  {
    id: 6,
    fan: "Off",
    light: "On",
    time: "01/17/2024",
  },
  {
    id: 7,
    fan: "Off",
    light: "On",
    time: "01/18/2024",
  },
  {
    id: 8,
    fan: "On",
    light: "On",
    time: "01/19/2024",
  },
  {
    id: 9,
    fan: "Off",
    light: "Off",
    time: "05/25/2024",
  },
  {
    id: 10,
    fan: "Off",
    light: "On",
    time: "11/21/2024",
  },
  {
    id: 11,
    fan: "On",
    light: "Off",
    time: "01/22/2024",
  },
];
export const mockDataSensor = [
  {
    id: 1,
    temp: 20,
    humidity: 50,
    light: 300,
  },
  {
    id: 2,
    temp: 15,
    humidity: 77,
    light: 111,
  },
  {
    id: 3,
    temp: 25,
    humidity: 65,
    light: 322,
  },
  {
    id: 4,
    temp: 37,
    humidity: 59,
    light: 388,
  },
  {
    id: 5,
    temp: 19,
    humidity: 56,
    light: 344,
  },
  {
    id: 6,
    temp: 36,
    humidity: 45,
    light: 222,
  },
  {
    id: 7,
    temp: 32,
    humidity: 12,
    light: 123,
  },
  {
    id: 8,
    temp: 32,
    humidity: 85,
    light: 399,
  },
  {
    id: 9,
    temp: 9,
    humidity: 66,
    light: 354,
  },
  {
    id: 10,
    temp: 10,
    humidity: 70,
    light: 150,
  },
];
export const mockLineData = [
  {
    id: "Temp",
    color: tokens("dark").redAccent[500],
    data: [
      {
        x: "1",
        y: 300,
      },
      {
        x: "2",
        y: 75,
      },
      {
        x: "3",
        y: 36,
      },
      {
        x: "4",
        y: 216,
      },
      {
        x: "5",
        y: 35,
      },
      {
        x: "6",
        y: 236,
      },
      {
        x: "7",
        y: 88,
      },
      {
        x: "8",
        y: 232,
      },
      {
        x: "9",
        y: 281,
      },
      {
        x: "10",
        y: 1,
      },
      {
        x: "11",
        y: 35,
      },
      {
        x: "12",
        y: 14,
      },
    ],
  },
  {
    id: "Humidity",
    color: tokens("dark").blueAccent[500],
    data: [
      {
        x: "1",
        y: 212,
      },
      {
        x: "2",
        y: 500,
      },
      {
        x: "3",
        y: 270,
      },
      {
        x: "4",
        y: 9,
      },
      {
        x: "5",
        y: 75,
      },
      {
        x: "6",
        y: 175,
      },
      {
        x: "7",
        y: 33,
      },
      {
        x: "8",
        y: 189,
      },
      {
        x: "9",
        y: 97,
      },
      {
        x: "10",
        y: 87,
      },
      {
        x: "11",
        y: 299,
      },
      {
        x: "12",
        y: 251,
      },
    ],
  },
  {
    id: "Light",
    color: tokens("dark").greenAccent[500],
    data: [
      {
        x: "1",
        y: 191,
      },
      {
        x: "2",
        y: 136,
      },
      {
        x: "3",
        y: 91,
      },
      {
        x: "4",
        y: 190,
      },
      {
        x: "5",
        y: 211,
      },
      {
        x: "6",
        y: 152,
      },
      {
        x: "7",
        y: 189,
      },
      {
        x: "8",
        y: 152,
      },
      {
        x: "9",
        y: 8,
      },
      {
        x: "10",
        y: 197,
      },
      {
        x: "11",
        y: 107,
      },
      {
        x: "12",
        y: 170,
      },
    ],
  },
];

export const initChartData = [
  {
    id: "Temp",
    color: tokens("dark").redAccent[500],
    data: [],
  },
  {
    id: "Humidity",
    color: tokens("dark").blueAccent[500],
    data: [],
  },
  {
    id: "Light",
    color: tokens("dark").greenAccent[500],
    data: [],
  },
];
