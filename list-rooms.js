import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";
import { calculateAgeUser } from "./getCheckInData.js";
import { loadDataSelectFloor } from "./select-rooms.js";

function showFormListUsersRooms() {
  const data = document.querySelector("#btn-rooms");
  data.addEventListener("click", (event) => {
    event.preventDefault;
    ShowHideHtmlElement("#listRoomsUsersContainer", "show");
    ShowHideHtmlElement("#checkInFormContainer", "hide");
    ShowHideHtmlElement("#checkOutFormContainer", "hide");
    ShowHideHtmlElement("#inVoiceFormContainer", "hide");
    ShowHideHtmlElement("#changeRoomFormContainer", "hide");
    deleteDataFromTableListRooms();
    loadDataRoomsInTable(store.rooms);
    loadDataSelectFloor("#selectRoomListRooms"); //Carga las plantas en el select de plantas
  });
}

function showListRooms() {
  const data = document.querySelector("#btn-listRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#tableListRoomsContainer", "show");
    ShowHideHtmlElement("#tableListUsersContainer", "hide");
    deleteDataFromTableListRooms();
    loadDataRoomsInTable(store.rooms);
    loadDataSelectFloor("#selectRoomListRooms");
  });
}

// Funcion que coge todas las habitaciones de hotel y las filtra por la planta
// que se ha seleccionado
function getRoomsOfFloorSelected() {
  const data = document.querySelector("#selectRoomListRooms");
  if (data.value === "0") return store.rooms;
  const rooms = store.rooms.filter(
    (value) => value.idRoom.toString()[0] === data.value
  );
  return rooms;
}

// Recibe un array de habitaciones y muestra segun la opcion que se seleccionó
function getRoomsToShowInTableRooms(rooms, option) {
  let finalRooms;
  switch (option) {
    case "empty":
      finalRooms = rooms.filter((value) => value.guest === "");
      break;
    case "full":
      finalRooms = rooms.filter((value) => value.guest !== "");
      break;
    case "all":
      finalRooms = rooms;
      break;
  }
  return finalRooms;
}

// Funcion que recive un array de habitacones a mostrar, y añade una fila en la
// tabla por cada habitacion. Añade ademas un boton de color verde o rojo en funcion
// de si esta libre o no, y un boton + en otra culumna si esta esta ocupada
function loadDataRoomsInTable(arrRooms) {
  const data = document.querySelector("#tableListRooms tbody");

  arrRooms.forEach((value) => {
    let addPlus = `<i id="plus" value="0" class="far fa-plus-square"></i>`;
    let status = `<i id="circle" class="fas fa-circle text-danger"></i>`;
    if (value.guest === "") {
      status = `<i id="circle" class="fas fa-circle text-success"></i>`;
      addPlus = "";
    }
    const stringHtml = `<tr id=${value.idRoom}><td>${value.idRoom}</td><td>${value.maxCapacity}</td><td>${value.price}</td><td>${status}</td><td class="text-right">${addPlus}</td></tr>`;
    data.insertAdjacentHTML("beforeend", stringHtml);
  });
}

//Funcion que controla si la habitacion esta ocupada o no, si lo esta añade un evento
// que al hacer click el el simbolo + de la tabla, añade una fila a la tabla con la
// informacion del usuario de dicha habitacion. Al hacer click, cambia el icono +
// por un - , que al pulsarlo elimina la fila de informacion de la tabla
function showDetailsRoom() {
  const data = document.querySelector("#tableListRooms");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    let room = store.rooms.find(
      (value) => value.idRoom.toString() === event.target.parentNode.id
    );
    if (event.target.id === "circle" || event.target.id === "plus") {
      room = store.rooms.find(
        (value) =>
          value.idRoom.toString() === event.target.parentNode.parentNode.id
      );
    }
    if (
      event.target.id === "plus" &&
      event.target.getAttribute("value") === "0"
    ) {
      const dataUser = store.customer.find(
        (value) => value.idFamily === room.guest
      );
      const age = calculateAgeUser(dataUser.parent1.year);
      let surname = dataUser.parent1.surname;
      if (dataUser.parent1.surname === undefined) surname = "";
      const stringHtml = `<tr class="bg-danger" id="show${
        room.idRoom
      }"><td>Id. Familia: ${dataUser.idFamily}</td><td>${
        dataUser.parent1.name
      } ${surname}</td><td>Edad: ${age}</td><td>Tlf: ${
        dataUser.parent1.tlf
      }</td><td class="text-right">Habs: ${dataUser.numRooms.join(
        ", "
      )}</td></tr>`;
      event.target.parentNode.parentNode.insertAdjacentHTML(
        "afterend",
        stringHtml
      );
      event.target.classList.add("fa-minus");
      event.target.classList.add("fas");
      event.target.classList.remove("fa-plus-square");
      event.target.classList.remove("far");
      event.target.setAttribute("value", "1");
      return;
    }
    if (
      event.target.id === "plus" &&
      event.target.getAttribute("value") === "1"
    ) {
      const trRemove = document.querySelector(`#show${room.idRoom}`);
      trRemove.remove();
      event.target.classList.remove("fa-minus");
      event.target.classList.remove("fas");
      event.target.classList.add("fa-plus-square");
      event.target.classList.add("far");
      event.target.setAttribute("value", "0");
    }
  });
}

// function showAllRoomsInTableListRooms() {
//   const data = document.querySelector("#showAllRoomsListRoom");
//   data.addEventListener("click", (event) => {
//     event.preventDefault();
//     deleteDataFromTableListRooms();
//     const floorRooms = getRoomsOfFloorSelected();
//     const finalRooms = getRoomsToShowInTableRooms(floorRooms, "all");
//     loadDataRoomsInTable(finalRooms);
//   });
// }

// function showEmptyRoomsInTableListRooms() {
//   const data = document.querySelector("#showEmptyRoomsListRoom");
//   data.addEventListener("click", (event) => {
//     event.preventDefault();
//     deleteDataFromTableListRooms();
//     const floorRooms = getRoomsOfFloorSelected();
//     const finalRooms = getRoomsToShowInTableRooms(floorRooms, "empty");
//     loadDataRoomsInTable(finalRooms);
//   });
// }

// function showFullRoomsInTableListRooms() {
//   const data = document.querySelector("#showFullRoomsListRoom");
//   data.addEventListener("click", (event) => {
//     event.preventDefault();
//     deleteDataFromTableListRooms();
//     const floorRooms = getRoomsOfFloorSelected();
//     const finalRooms = getRoomsToShowInTableRooms(floorRooms, "full");
//     loadDataRoomsInTable(finalRooms);
//   });
// }

//Borra los datos de la tabla, previo a que otra funcion vuelva a cargar datos en ella
function deleteDataFromTableListRooms() {
  const data = document.querySelectorAll("#tableListRooms tbody *");
  data.forEach((value) => {
    value.remove();
  });
}

// Funcion que carga las habitaciones que quieres ver segun la planta que escojas
function selectFloorListRooms() {
  const data = document.querySelector("#selectRoomListRooms");
  data.addEventListener("change", (event) => {
    event.preventDefault();
    deleteDataFromTableListRooms();
    const floorRooms = getRoomsOfFloorSelected();
    const finalRooms = getRoomsToShowInTableRooms(floorRooms, "all");
    loadDataRoomsInTable(finalRooms);
  });
}

//Esta funcion agrupa los tres botones de seleccion de habitaciones, ya que hacen
// lo mismo con la diferencia del estado de las habitaciones que quieres mostrar.
// tiene un evento de click en el div que los engloba, de modo que si haces click
// en cualquier boton, coge el dato que necesita en el atributo value que tiene
// cada boton
function selelctStatusRoom() {
  const data = document.querySelector("#statusbuttons");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      event.target.value === "empty" ||
      event.target.value === "full" ||
      event.target.value === "all"
    ) {
      deleteDataFromTableListRooms();
      const floorRooms = getRoomsOfFloorSelected();
      const finalRooms = getRoomsToShowInTableRooms(
        floorRooms,
        event.target.value
      );
      loadDataRoomsInTable(finalRooms);
    }
  });
}

export {
  selelctStatusRoom,
  selectFloorListRooms,
  showFormListUsersRooms,
  showDetailsRoom,
  showListRooms,
  // showAllRoomsInTableListRooms,
  // showEmptyRoomsInTableListRooms,
  // showFullRoomsInTableListRooms,
};
