import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";
import { checkDataCheckOut } from "./checkOut.js";
import { calculateAgeUser } from "./getCheckInData.js";
import {
  loadDataSelectFloor,
  loadRoomsByFloor,
  loadDataRooms,
  loadRooms,
} from "./select-rooms.js";

function showChangeRoomForm() {
  const data = document.querySelector("#btn-changeroom");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#changeRoomFormContainer", "show");
    ShowHideHtmlElement("#inVoiceFormContainer", "hide");
    ShowHideHtmlElement("#checkOutFormContainer", "hide");
    ShowHideHtmlElement("#checkInFormContainer", "hide");
    ShowHideHtmlElement("#listRoomsUsersContainer", "hide");
  });
}

function getDataFamiliy() {
  const data = document.querySelector("#changeRoomForm");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = checkDataCheckOut("#changeRoomDni");
    ShowHideHtmlElement("#changeRoomData", "show");
    printDataFamilyOnHtml(user);
  });
}

function printDataFamilyOnHtml(user) {
  const dni = document.querySelector("#changeRoomDataDni");
  const name = document.querySelector("#changeRoomDataName");
  const year = document.querySelector("#changeRoomDataAge");
  const tlf = document.querySelector("#changeRoomDataTlf");
  const adults = document.querySelector("#changeRoomDataAdults");
  const children = document.querySelector("#changeRoomDataChildren");
  dni.textContent = user.parent1.idCard;
  let surname;
  user.parent1.surname === undefined
    ? (surname = "")
    : (surname = user.parent1.surname);
  name.textContent = `${user.parent1.name} ${surname}`;
  year.textContent = calculateAgeUser(user.parent1.year);
  tlf.textContent = user.parent1.tlf;
  adults.textContent = user.adults.length;
  children.textContent = user.children.length;
  const dataRemove = document.querySelectorAll("#changeRoomDataRooms *");
  dataRemove.forEach((value) => value.remove());
  user.numRooms.forEach((value) => {
    const data = document.querySelector("#changeRoomDataRooms");
    data.insertAdjacentHTML(
      "beforeend",
      `<label class="mx-2" id="${value}">${value}</label>`
    );
  });
}

function selectRoomToLeave() {
  const data = document.querySelector("#changeRoomDataRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const change = confirm(
      `Desea cambiar la habitacion ${event.target.textContent} de este usuario?`
    );
    if (change) {
      ShowHideHtmlElement("#dataSelectedRoom");
      showDataSelectedRoom(event.target.textContent);
      ShowHideHtmlElement("#tableChangeRoom", "show");
      loadDataSelectFloor("#selectRoomByFloorChangeRoom");
      const arrRooms = loadRoomsByFloor("0");
      const rooms = loadRooms("free", arrRooms);
      loadDataRooms("#tableChangeRooms", rooms);
    }
  });
}

function showDataSelectedRoom(numRoom) {
  const dataRoom = store.rooms.find(
    (value) => value.idRoom.toString() === numRoom
  );
  const room = document.querySelector("#dataNumRoom");
  const capacity = document.querySelector("#dataMaxCapacity");
  const price = document.querySelector("#dataPriceRoom");
  room.textContent = dataRoom.idRoom;
  capacity.textContent = dataRoom.maxCapacity;
  price.textContent = dataRoom.price;
}

function changeFloorChangeRoom() {
  const data = document.querySelector("#selectRoomByFloorChangeRoom");
  data.addEventListener("change", (event) => {
    event.preventDefault();
    clearDataSelectRoom();
    clearDataTable();
    const arrRooms = loadRoomsByFloor(data.value);
    const rooms = loadRooms("free", arrRooms);
    loadDataRooms("#tableChangeRooms", rooms);
  });
}

function clearDataTable() {
  const data = document.querySelectorAll("#tableChangeRooms td");
  data.forEach((value) => value.remove());
}

function clearDataSelectRoom() {
  const data = document.querySelectorAll("selectRoomByFloorChangeRoom option");
  data.forEach((value) => value.remove());
}

function selectRoomToChange() {
  const data = document.querySelector("#tableChangeRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const selectedRoom = store.rooms.find(
      (value) => value.idRoom.toString() === event.target.parentNode.id
    );
    const capacity = selectedRoom.maxCapacity;
    const changeTrue = checkChangeTrue(capacity, selectedRoom.idRoom);
    if (!changeTrue) return;
    const userDni = document.querySelector("#changeRoomDataDni").textContent;
    const roomToLeave = document.querySelector("#dataNumRoom").textContent;
    updateDataInStore(userDni, roomToLeave, event.target.parentNode.id);
  });
}

function checkChangeTrue(capacitySelected, selectedRoom) {
  let dataTrue;
  const capacityRoomLeave = document.querySelector("#dataMaxCapacity")
    .textContent;
  const roomToLeave = document.querySelector("#dataNumRoom").textContent;
  if (capacitySelected < capacityRoomLeave) {
    dataTrue = confirm(
      `La habitacion ${selectedRoom} es de menos capacidad que la habitacion ${roomToLeave}. ¿Seguir de todos modos?`
    );
    return dataTrue;
  }

  if (capacitySelected >= capacityRoomLeave) {
    dataTrue = confirm(
      `¿Cambiar la habitacion ${selectedRoom} y dejar la ${roomToLeave}`
    );
    return dataTrue;
  }
}

// function getFinalRooms(dni,oldRoom){
//   const dataFamily = store.customer.find((value)=> value.parent1.idCard=== dni)
//   const rooms = dataFamily.numRooms

// }

function updateDataInStore(dni, oldRoom, newRoom) {
  const family = store.customer.find((value) => value.parent1.idCard === dni);
  if (!family) {
    alert("Algo ha fallado, no se encuentra la familia en la base de datos");
    return;
  }
  const indexRoom = family.numRooms.indexOf(parseInt(oldRoom));
  family.numRooms.splice(indexRoom, 1, parseInt(newRoom));
  const dataRemove = document.querySelectorAll("#changeRoomDataRooms label");
  dataRemove.forEach((value) => value.remove());
  const user = checkDataCheckOut("#changeRoomDni");
  user.numRooms.forEach((value) => {
    const data = document.querySelector("#changeRoomDataRooms");
    data.insertAdjacentHTML(
      "beforeend",
      `<label class="mx-2" id="${value}">${value}</label>`
    );
  });
  const indexOldRoom = store.rooms.findIndex(
    (value) => value.idRoom === parseInt(oldRoom)
  );
  store.rooms[indexOldRoom].guest = "";
  const indexNewRoom = store.rooms.findIndex(
    (value) => value.idRoom === parseInt(newRoom)
  );
  store.rooms[indexNewRoom].guest = family.idFamily.toString();
  ShowHideHtmlElement("#dataSelectedRoom", "hide");
  ShowHideHtmlElement("#tableChangeRoom", "hide");
}

export {
  selectRoomToChange,
  showChangeRoomForm,
  getDataFamiliy,
  selectRoomToLeave,
  changeFloorChangeRoom,
};
