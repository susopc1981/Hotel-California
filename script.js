const store = {
  customer: [
    {
      idFamily: 1,
      parent1: {
        idCard: "32456333C",
        name: "Carlos Gonzalez",
        year: 2002,
        tlf: "666555444",
      },
      adults: [{ idCard: "12345678R", name: "Juan XXIII", year: 1992 }],
      children: [
        { idCard: "32456333D", name: "Pablo", year: 2013 },
        { idCard: "32456333E", name: "Juan XXIV", year: 2008 },
      ],
      numRooms: [102],
      checkInDate: "2020/06/07",
      checkOutDate: "",
    },
    {
      idFamily: 2,
      parent1: {
        idCard: "32456333F",
        name: "Andres Montes",
        year: 2002,
        tlf: "678333121",
      },
      adults: [],
      children: [
        { idCard: "32456333H", name: "Jorge", year: 2018 },
        { idCard: "32456333I", name: "Ana", year: 2001 },
      ],
      numRooms: [303, 304],
      checkInDate: "2020/06/01",
    },
    {
      idFamily: 3,
      parent1: {
        idCard: "32456333J",
        name: "Sofía Martinez",
        year: 2001,
        tlf: "655723111",
      },
      adults: [{ idCard: "32456333K", name: "Juana daPaña", year: 1992 }],
      children: [{ idCard: "32456333L", name: "Jose", year: 2008 }],
      numRooms: [101, 103],
      checkInDate: "2020/05/01",
    },
    {
      idFamily: 4,
      parent1: {
        idCard: "32456333M",
        name: "Jose Antonio",
        year: 2002,
        tlf: "981224385",
      },
      adults: [{ idCard: "32456333N", name: "Pedro Duque", year: 1992 }],
      children: [
        { idCard: "32456333O", name: "Javier", year: 2013 },
        { idCard: "32456333P", name: "David", year: 2008 },
        { idCard: "32456333Q", name: "Andreita", year: 2005 },
      ],
      numRooms: [201, 202],
      checkInDate: "2020/06/05",
    },
  ],
  rooms: [
    { idRoom: 101, maxCapacity: 1, price: 50, guest: 3 },
    { idRoom: 102, maxCapacity: 4, price: 150, guest: 1 },
    { idRoom: 103, maxCapacity: 2, price: 110, guest: 3 },
    { idRoom: 104, maxCapacity: 2, price: 100, guest: "" },
    { idRoom: 201, maxCapacity: 2, price: 150, guest: 4 },
    { idRoom: 202, maxCapacity: 3, price: 200, guest: 4 },
    { idRoom: 301, maxCapacity: 1, price: 50, guest: "" },
    { idRoom: 302, maxCapacity: 4, price: 150, guest: "" },
    { idRoom: 303, maxCapacity: 2, price: 110, guest: 2 },
    { idRoom: 304, maxCapacity: 2, price: 100, guest: 2 },
    { idRoom: 401, maxCapacity: 2, price: 150, guest: "" },
    { idRoom: 402, maxCapacity: 3, price: 200, guest: "" },
    { idRoom: 403, maxCapacity: 2, price: 150, guest: "" },
    { idRoom: 404, maxCapacity: 4, price: 200, guest: "" },
  ],
  oldCustomer: [
    // { idCard: "32456333C", name: "Carlos Gonzalez", age: 18 },
    // { idCard: "32456333Q", name: "Andreita", age: 27 },
    // { idCard: "12345678R", name: "Juan XXIII", age: 28 },
    // { idCard: "32456333N", name: "Pedro Duque", age: 28 },
  ],
  currentUser: [],
  currentAdultChildren: [],
  currentRooms: [],
};

// currentUser: [{ parent1: {} }, { others: [] }]

import { registerUser } from "./checkIn.js";

import {
  getDataCheckIn,
  closeAddAdultForm,
  removeAdultFromSelect,
  removeChildFromSelect,
  checkIn,
  showCheckInForm,
} from "./getCheckInData.js";
import {
  deleteSelectedRoom,
  showFormSelectRoom,
  changeFloorSelect,
  selectAllRooms,
  selectEmptyRooms,
  selectFullRooms,
  getRoomFromTable,
  selectRoomForm,
} from "./select-rooms.js";
import { showSelectCapacityForm } from "./select-capacity.js";
import { showCheckOutForm, checkOut, confirmCheckOut } from "./checkOut.js";
import { showFormCheckIn } from "./checkIn.js";
import { showInVoiceForm, getDataUser, printInVoice } from "./inVoice.js";
import {
  showChangeRoomForm,
  getDataFamiliy,
  selectRoomToLeave,
  changeFloorChangeRoom,
  selectRoomToChange,
} from "./change-room.js";
import {
  showFormListUsersRooms,
  showDetailsRoom,
  showListRooms,
  // showAllRoomsInTableListRooms,
  // showEmptyRoomsInTableListRooms,
  // showFullRoomsInTableListRooms,
  selectFloorListRooms,
  selelctStatusRoom,
} from "./list-rooms.js";
import { showListUsers, showInfoUserOnTableListUsers } from "./list-users.js";

showInfoUserOnTableListUsers();
showListRooms();
showListUsers();
showDetailsRoom();
selelctStatusRoom();
selectFloorListRooms();
// showAllRoomsInTableListRooms();
// showEmptyRoomsInTableListRooms();
// showFullRoomsInTableListRooms();
showFormListUsersRooms();
selectRoomToLeave();
confirmCheckOut();
selectRoomToChange();
showFormCheckIn();
showChangeRoomForm();
getDataUser();
printInVoice();
showInVoiceForm();
getDataFamiliy();
registerUser();
checkOut();
getDataCheckIn();
showCheckOutForm();
deleteSelectedRoom();
getRoomFromTable();
closeAddAdultForm();
removeAdultFromSelect();
removeChildFromSelect();
checkIn();
showCheckInForm();
showFormSelectRoom();
changeFloorSelect();
selectRoomForm();
selectFullRooms();
selectEmptyRooms();
selectAllRooms();
showSelectCapacityForm();
changeFloorChangeRoom();

export { store };
