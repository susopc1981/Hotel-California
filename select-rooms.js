import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";

function showFormSelectRoom() {
  const data = document.querySelector("#btn-selectRoom");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#form-selectRoom", "show");
    ShowHideHtmlElement("#form-selectCapacity", "hide");
    ShowHideHtmlElement("#tableRooms", "show");
    loadDataSelectFloor("#selectRoomByFloor");
    const floor = getFloor();
    const arrRooms = loadRoomsByFloor(floor);
    const rooms = loadRooms("free", arrRooms);
    loadDataRooms("#tableRooms", rooms);
  });
}

function loadRooms(option, arrRooms) {
  let emptyRooms;
  if (option === "free") {
    // emptyRooms = store.rooms.filter((value) => value.guest === "");
    emptyRooms = arrRooms.filter((value) => value.guest === "");
  }
  if (option === "full") {
    emptyRooms = arrRooms.filter((value) => value.guest !== "");
  }
  if (option === "all") {
    emptyRooms = arrRooms;
  }
  deleteDataFromTableRooms();
  return emptyRooms;
}

function loadDataRooms(id, arrRooms) {
  let status;
  const data = document.querySelector(`${id} tbody`);
  if (arrRooms.length === 0) {
    data.insertAdjacentHTML(
      "beforeend",
      "<p>No hay habitaciones libres en esta planta</p>"
    );
    return;
  }
  arrRooms.forEach((value) => {
    if (value.guest === "") {
      status = `<i id="circle" class="fas fa-circle text-success"></i>`;
    } else {
      status = `<i id="circle" class="fas fa-circle text-danger"></i>`;
    }
    const stringHtml = `<tr id=${value.idRoom}><td>${value.idRoom}</td><td>${value.maxCapacity}</td><td>${value.price}</td><td>${status}</td></tr>`;
    data.insertAdjacentHTML("beforeend", stringHtml);
  });
}

function loadDataSelectFloor(id) {
  const data = document.querySelector(id);
  const deleteSelect = document.querySelectorAll(`${id} option`);
  deleteSelect.forEach((value) => value.remove());
  const arrFloors = ["Todas"];
  store.rooms.forEach((value) => {
    const floor = value.idRoom.toString();
    const result = arrFloors.find((value) => value === floor[0]);
    if (!result) {
      arrFloors.push(floor[0]);
    }
  });
  arrFloors.forEach((value, index) => {
    data.insertAdjacentHTML(
      "beforeend",
      `<option value=${index}>${value}</option>`
    );
  });
}

function deleteDataFromTableRooms() {
  const data = document.querySelectorAll("tbody *");
  if (!data) return;
  data.forEach((value) => value.remove());
}

function changeFloorSelect() {
  const data = document.querySelector("#selectRoomByFloor");
  data.addEventListener("change", (event) => {
    event.preventDefault();
    deleteDataFromTableRooms();
    const rooms = loadRoomsByFloor(data.value);
    const emptyRooms = loadRooms("free", rooms);
    loadDataRooms("#tableRooms", emptyRooms);
  });
}

function loadRoomsByFloor(floor) {
  // let status;
  let arrRoom;
  // const data = document.querySelector("#tableRooms tbody");
  if (floor === "0") {
    arrRoom = store.rooms;
  } else {
    arrRoom = store.rooms.filter(
      (value) => value.idRoom.toString()[0] === floor
    );
  }
  return arrRoom;
}

function selectAllRooms() {
  const data = document.querySelector("#btn-allRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const floor = getFloor();
    const arrRooms = loadRoomsByFloor(floor);
    const rooms = loadRooms("all", arrRooms);
    loadDataRooms("#tableRooms", rooms);
  });
}

function selectEmptyRooms() {
  const data = document.querySelector("#btn-emptyRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const floor = getFloor();
    const arrRooms = loadRoomsByFloor(floor);
    const rooms = loadRooms("free", arrRooms);
    loadDataRooms("#tableRooms", rooms);
  });
}

function selectFullRooms() {
  const data = document.querySelector("#btn-fullRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const floor = getFloor();
    const arrRooms = loadRoomsByFloor(floor);
    const rooms = loadRooms("full", arrRooms);
    loadDataRooms("#tableRooms", rooms);
  });
}

function getFloor() {
  const data = document.querySelector("#selectRoomByFloor");
  return data.value;
}

function getRoomFromTable() {
  const data = document.querySelector("#tableRooms tbody");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    let room;
    if (event.target.id === "circle") {
      room = store.rooms.find(
        (value) =>
          value.idRoom.toString() === event.target.parentNode.parentNode.id
      );
    } else {
      room = store.rooms.find(
        (value) => value.idRoom.toString() === event.target.parentNode.id
      );
    }
    const finalRoom = store.currentRooms.find((value) => value === room.idRoom);
    if (!finalRoom && room.guest === "") {
      const dataTrue = confirm(`Añadir la habitacion ${room.idRoom}?`);
      if (!dataTrue) return;
      store.currentRooms.push(room.idRoom);
      ShowHideHtmlElement("#selectedRooms", "show");
      const data = document.querySelector("#roomsToReserve");
      data.insertAdjacentHTML(
        "beforeend",
        `<label class="m-2" >${room.idRoom}</label>`
      );
    }
  });
}

function selectRoomForm() {
  const data = document.querySelector("#btn-dataRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#checkInForm", "hide");
    ShowHideHtmlElement("#selectRoomForm", "show");
    loadDataUserInLabels();
    loadDataSelectFloor("#selectRoomByFloor");
    const arrRooms = loadRoomsByFloor("0");
    const rooms = loadRooms("free", arrRooms);
    loadDataRooms("#tableRooms", rooms);
  });
}

function loadDataUserInLabels() {
  const name = document.querySelector("#userNameLabel");
  const dni = document.querySelector("#userDniLabel");
  const tlf = document.querySelector("#userTlfLabel");
  const adult = document.querySelector("#userAdultLabel");
  const children = document.querySelector("#userChildrenLabel");
  name.textContent = `${store.currentUser[0].parent1.name} ${store.currentUser[0].parent1.surname}`;
  dni.textContent = store.currentUser[0].parent1.idCard;
  tlf.textContent = store.currentUser[0].parent1.tlf;
  adult.textContent = store.currentUser[0].adults.length;
  children.textContent = store.currentUser[0].children.length;
}

function deleteSelectedRoom() {
  const data = document.querySelector("#roomsToReserve");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const response = confirm(
      `Eliminar la habitacion ${event.target.textContent}?`
    );
    if (response) {
      const index = store.currentRooms.indexOf(
        parseInt(event.target.textContent)
      );
      store.currentRooms.splice(index, 1);
      const dataRemove = document.querySelectorAll("#roomsToReserve *");
      dataRemove.forEach((value) => {
        value.remove();
      });
      if (dataRemove.length === 1)
        ShowHideHtmlElement("#selectedRooms", "hide");
      store.currentRooms.forEach((value) => {
        data.insertAdjacentHTML(
          "beforeend",
          `<label class="mx-2" >${value}</label>`
        );
      });
    }
  });
}

export {
  deleteSelectedRoom,
  getRoomFromTable,
  selectRoomForm,
  showFormSelectRoom,
  changeFloorSelect,
  selectAllRooms,
  selectEmptyRooms,
  selectFullRooms,
  loadDataSelectFloor,
  loadRoomsByFloor,
  loadDataRooms,
  loadRooms,
};
