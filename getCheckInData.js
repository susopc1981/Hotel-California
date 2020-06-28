// const htmlElements = {};

// function getAllDataFromCheckInForm() {
//   // const btnAddAdultForm = document.querySelector("#btn-addAdultForm");
//   // htmlElements = { ...btnAddAdultForm };
// }

import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";

function getDataCheckIn() {
  const data = document.querySelector("#btn-addAdultForm");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    checkDataAddAdult();
    clearAddAdultForm();
  });
}

function closeAddAdultForm() {
  const data = document.querySelector("#btn-closeAddAdultForm");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    clearAddAdultForm();
  });
}

function removeAdultFromSelect() {
  const data = document.querySelector("#removeAdult");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    removeDataFromSelects("#checkInAdultsSelect");
  });
}

function removeChildFromSelect() {
  const data = document.querySelector("#removeChildren");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    removeDataFromSelects("#checkInChildren");
  });
}

function removeDataFromSelects(id) {
  const data = document.querySelector(id).value;
  const dataToRemove = document.querySelector(`${id} [value='${data}']`);
  const index = dataToRemove.getAttribute("value");
  store.currentAdultChildren.splice(
    parseInt(dataToRemove.getAttribute("value")),
    1
  );
  ShowHideHtmlElement("#checkInAdultsSelect", "hide");
  ShowHideHtmlElement("#removeAdult", "hide");
  ShowHideHtmlElement("#checkInChildren", "hide");
  ShowHideHtmlElement("#removeChildren", "hide");
  loadDataInAdultSelect();
}

function loadDataInAdultSelect() {
  const dataAdult = document.querySelectorAll("#checkInAdultsSelect option");
  dataAdult.forEach((value) => value.remove());
  const dataChildren = document.querySelectorAll("#checkInChildren option");
  dataChildren.forEach((value) => value.remove());
  if (store.currentAdultChildren.length === 0) {
    ShowHideHtmlElement("#checkInAdultsSelect", "hide");
    ShowHideHtmlElement("#removeAdult", "hide");
    ShowHideHtmlElement("#checkInChildren", "hide");
    ShowHideHtmlElement("#removeChildren", "hide");
    return;
  }
  const dataAdultSelect = document.querySelector("#checkInAdultsSelect");
  const dataChildrenSelect = document.querySelector("#checkInChildren");
  store.currentAdultChildren.forEach((value, index) => {
    const age = calculateAgeUser(value.year);
    if (age < 18) {
      ShowHideHtmlElement("#checkInChildren", "show");
      ShowHideHtmlElement("#removeChildren", "show");
      dataChildrenSelect.insertAdjacentHTML(
        "beforeend",
        `<option value=${index}>${value.name} ${value.surname}</option>`
      );
    } else {
      ShowHideHtmlElement("#checkInAdultsSelect", "show");
      ShowHideHtmlElement("#removeAdult", "show");
      dataAdultSelect.insertAdjacentHTML(
        "beforeend",
        `<option value=${index}>${value.name} ${value.surname}</option>`
      );
    }
  });
}

function addHtmltoForm(objAdult) {
  let select = "#checkInAdultsSelect";
  let buttonRemove = "#removeAdult";
  const age = calculateAgeUser(objAdult.year);
  if (age < 18) {
    select = "#checkInChildren";
    buttonRemove = "#removeChildren";
  }
  const buttonRemoveUser = document.querySelector(buttonRemove);
  buttonRemoveUser.classList.remove("d-none");
  const data = document.querySelector(select);
  data.classList.remove("d-none");
  const value = store.currentAdultChildren.length - 1;
  data.insertAdjacentHTML(
    "beforeend",
    `<option value=${value}>${objAdult.name} ${objAdult.surname}</option>`
  );
}

function clearAddAdultForm() {
  const data = document.querySelectorAll(".modal-body [type='text']");
  data.forEach((value) => {
    value.value = "";
  });
}

function checkDataAddAdult() {
  const dni = document.querySelector("#addAdultDni").value;
  const name = document.querySelector("#addAdultName").value;
  const surname = document.querySelector("#addAdultSurname").value;
  const year = document.querySelector("#addAdultYear").value;
  const tlf = document.querySelector("#addAdultTlf").value;
  if (dni === "" || dni.lenght < 9) {
    alert("El dni no es correcto");
    return;
  }
  if (year < 4) {
    alert("Año de nacimiento incorrecto");
    return;
  }
  if (name === "") {
    alert("El campo nombre no puede estar vacío");
    return;
  }
  if (tlf.lenght < 9) {
    alert("El formato del telefono no es correcto");
    return;
  }
  const newAdult = { dni, name, surname, year, tlf };
  store.currentAdultChildren.push(newAdult);
  addHtmltoForm(newAdult);
}

function calculateAgeUser(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;
  return age;
}

function checkIn() {
  const data = document.querySelector("#checkInForm");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = checkDataCheckIn();
    store.currentUser = [];
    store.currentUser.push(result);
    const data = document.querySelector("#btn-dataRooms");
    data.removeAttribute("disabled");
  });
}

function checkDataCheckIn() {
  const idCard = document.querySelector("#checkInDni").value;
  const name = document.querySelector("#checkInName").value;
  const surname = document.querySelector("#checkInSurname").value;
  const year = document.querySelector("#checkInYear").value;
  const tlf = document.querySelector("#checkInTlf").value;
  let checkInDate = document.querySelector("#checkInDate").value;
  let checkOutDate = document.querySelector("#checkOutDate").value;
  checkInDate
    ? (checkInDate = formatDateTimepicker(checkInDate))
    : (checkInDate = formatDate(new Date()));
  checkOutDate
    ? (checkOutDate = formatDateTimepicker(checkOutDate))
    : (checkOutDate = "");
  if (idCard === "" || idCard.lenght < 9) {
    alert("El dni no es correcto");
    return;
  }
  if (year < 4) {
    alert("Año de nacimiento incorrecto");
    return;
  }
  if (name === "") {
    alert("El campo nombre no puede estar vacío");
    return;
  }
  if (tlf.lenght < 9) {
    alert("El formato del telefono no es correcto");
    return;
  }
  const children = [];
  const adults = [];
  if (store.currentAdultChildren.length !== 0) {
    store.currentAdultChildren.forEach((value) => {
      const age = calculateAgeUser(value.year);
      age < 18 ? children.push(value) : adults.push(value);
    });
  }
  const user = {
    parent1: { idCard, name, surname, year, tlf },
    children,
    adults,
    checkInDate,
    checkOutDate,
  };
  return user;
}

function showCheckInForm() {
  store.currentUser = [];
  const data = document.querySelector("#btn-dataUsers");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    // store.currentUser = [];
    // const data = document.querySelector("#btn-dataRooms");
    ShowHideHtmlElement("#checkInForm", "show");
    ShowHideHtmlElement("#selectRoomForm", "hide");
  });
}

function formatDateTimepicker(date) {
  const month = date.substring(0, 2);
  const day = date.substring(3, 5);
  const year = date.substring(6);
  const finalDate = `${year}/${month}/${day}`;
  return finalDate;
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const finalDate = `${year}/${month + 1}/${day}`;
  return finalDate;
}

export {
  getDataCheckIn,
  closeAddAdultForm,
  removeAdultFromSelect,
  removeChildFromSelect,
  checkIn,
  showCheckInForm,
  formatDate,
  calculateAgeUser,
  formatDateTimepicker,
  removeDataFromSelects,
};
