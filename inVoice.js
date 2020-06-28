import { store } from "./script.js";
import {
  formatDate,
  calculateAgeUser,
  removeAdultFromSelect,
} from "./getCheckInData.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";

function showInVoiceForm() {
  const data = document.querySelector("#btn-invoice");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#inVoiceFormContainer", "show");
    ShowHideHtmlElement("#checkInFormContainer", "hide");
    ShowHideHtmlElement("#checkOutFormContainer", "hide");
    ShowHideHtmlElement("#changeRoomFormContainer", "hide");
    ShowHideHtmlElement("#listRoomsUsersContainer", "hide");
  });
}

function getDataUser() {
  const data = document.querySelector("#inVoiceForm");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = checkDataInVoice();
    if (user) {
      showInVoice(user);
      ShowHideHtmlElement("#inVoiceData", "show");
      const data = document.querySelector("#inVoiceData");
      data.classList.add("d-flex");
      loadDataInVoice(user);
    }
  });
}

function printInVoice() {
  const data = document.querySelector("#showInVoice");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#inVoiceContainer", "show");
    const dniUser = document.querySelector("#inVoiceDataDni").textContent;
    const user = store.customer.find(
      (value) => value.parent1.idCard === dniUser
    );
    printHTML(user);
  });
}

function printHTML(user) {
  let checkOut = document.querySelector("#inVoiceDataCheckOut").value;
  if (checkOut === "Seleccionar Fecha Salida")
    checkOut = formatDate(new Date());
  const data = document.querySelector("#inVoiceText");
  const days = calculateDays(user.checkInDate, checkOut);
  const amount = calculateAmount(user.idFamily, days);
  const removeData = document.querySelectorAll("#inVoiceText p");
  removeData.forEach((value) => value.remove());
  data.insertAdjacentHTML(
    "beforeend",
    `<p>El usuario ${
      user.parent1.name
    } debe abonar la friolera de ${amount}€ por la estancia de ${days} noches en la(s) habitacion(es) ${user.numRooms.join(
      ", "
    )}</p>`
  );
}

function loadDataInVoice(user) {
  const dni = document.querySelector("#inVoiceDataDni");
  const name = document.querySelector("#inVoiceDataName");
  const tlf = document.querySelector("#inVoiceDataTlf");
  const adults = document.querySelector("#inVoiceDataAdults");
  const children = document.querySelector("#inVoiceDataChildren");
  const age = document.querySelector("#inVoiceDataAge");
  const checkIn = document.querySelector("#inVoiceDataCheckIn");
  const checkOut = document.querySelector("#inVoiceDataCheckOut");
  dni.textContent = user.parent1.idCard;
  let surname;
  user.parent1.surname === undefined
    ? (surname = "")
    : (surname = user.parent1.surname);

  name.textContent = `${user.parent1.name} ${surname}`;
  tlf.textContent = user.parent1.tlf;
  adults.textContent = user.adults.length;
  children.textContent = user.children.length;
  age.textContent = calculateAgeUser(user.parent1.year);
  checkIn.textContent = user.checkInDate;
  user.checkOutDate !== ""
    ? (checkOut.value = user.checkOutDate)
    : (checkOut.value = "Seleccionar Fecha Salida");
}

function checkDataInVoice() {
  const data = document.querySelector("#inVoiceDni").value;
  if (data === "") {
    alert("El campo DNI no puede estar vacío");
    return false;
  }
  const user = store.customer.find((value) => value.parent1.idCard === data);
  if (!user) {
    alert("DNI no encontrado");
    return false;
  }
  return user;
}

function showInVoice(dataFamily) {
  let checkOutDate;
  dataFamily.checkOutDate === ""
    ? (checkOutDate = formatDate(new Date()))
    : (checkOutDate = dataFamily.checkOutDate);
  const days = calculateDays(dataFamily.checkInDate, checkOutDate);
  const amount = calculateAmount(dataFamily.idFamily, days);
  return amount;
}

function calculateDays(checkInDate, checkOutDate) {
  let date1;
  checkOutDate ? (date1 = new Date(checkOutDate)) : (date1 = new Date());
  const date2 = new Date(checkInDate);
  const sustractDays = date1.getTime() - date2.getTime();
  let days = Math.round(sustractDays / (1000 * 60 * 60 * 24));
  if (days === 0) days = 1;
  return days;
}

function calculateAmount(idFamily, days) {
  let totalAmount = 0;
  store.rooms.forEach((value) => {
    if (idFamily === value.guest) {
      totalAmount = totalAmount + value.price * days;
    }
  });
  return totalAmount;
}

export {
  showInVoice,
  showInVoiceForm,
  getDataUser,
  printInVoice,
  calculateDays,
  calculateAmount,
};
