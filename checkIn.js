import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";
// import { getRoomFromTable } from "./select-rooms.js";

function registerUser() {
  const data = document.querySelector("#btn-finalCheckIn");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const numRooms = store.currentRooms;
    const idFamily = getIdFamily();
    let finalUser = { ...store.currentUser[0], numRooms, idFamily };
    store.customer.push(finalUser);
    numRooms.forEach((roomsToReserve) => {
      store.rooms.forEach((roomsValue) => {
        if (roomsValue.idRoom === roomsToReserve) {
          roomsValue.guest = idFamily;
        }
      });
    });
    store.currentUser.splice(0, 1);
    store.currentAdultChildren = [];
    store.currentRooms = [];
    let stringRooms = `las habitaciones ${finalUser.numRooms.join(", ")}`;
    if (finalUser.numRooms.length === 1) {
      stringRooms = `la habitación ${finalUser.numRooms[0]}`;
    }
    alert(`Check-In completado
    ${finalUser.parent1.name} ${finalUser.parent1.surname} ha resevado ${stringRooms}`);
    clearCheckInForms();
    finalUser = {};
  });
}

function clearCheckInForms() {
  const data = document.querySelectorAll("#checkInForm [type=text]");
  data.forEach((value) => (value.value = ""));
  const select2 = document.querySelectorAll("#checkInAdultsSelect *");
  const select1 = document.querySelectorAll("#checkInChildren *");
  select1.forEach((value) => value.remove());
  select2.forEach((value) => value.remove());
  document.querySelector("#userNameLabel").textContent = "";
  document.querySelector("#userDniLabel").textContent = "";
  document.querySelector("#userTlfLabel").textContent = "";
  document.querySelector("#userAdultLabel").textContent = "";
  document.querySelector("#userChildrenLabel").textContent = "";
  const reservedRooms = document.querySelectorAll("#roomsToReserve *");
  reservedRooms.forEach((value) => value.remove());
  ShowHideHtmlElement("#checkInAdultsSelect", "hide");
  ShowHideHtmlElement("#checkInChildren", "hide");
  ShowHideHtmlElement("#removeChildren", "hide");
  ShowHideHtmlElement("#removeAdult", "hide");
  ShowHideHtmlElement("#selectRoomForm", "hide");
  const lockButton = document.querySelector("#btn-dataRooms");
  lockButton.setAttribute("disabled", true);
  ShowHideHtmlElement("#checkInForm", "show");
  // getRoomFromTable();
}

function showFormCheckIn() {
  const data = document.querySelector("#btn-checkin");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#checkInFormContainer", "show");
    ShowHideHtmlElement("#inVoiceFormContainer", "hide");
    ShowHideHtmlElement("#checkOutFormContainer", "hide");
    ShowHideHtmlElement("#changeRoomFormContainer", "hide");
    ShowHideHtmlElement("#listRoomsUsersContainer", "hide");
    ShowHideHtmlElement("#checkInForm", "show");
    ShowHideHtmlElement("#selectRoomForm", "hide");
  });
}

function getIdFamily() {
  const data = store.customer.length - 1;
  const idFam = store.customer[data].idFamily;
  return idFam + 1;
}

export { registerUser, showFormCheckIn };
