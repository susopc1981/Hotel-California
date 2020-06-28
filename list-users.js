import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";
import { calculateAgeUser } from "./getCheckInData.js";

function showListUsers() {
  const data = document.querySelector("#btn-listUsers");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#tableListUsersContainer", "show");
    ShowHideHtmlElement("#tableListRoomsContainer", "hide");
    loadDataOnTableListUsers(store.customer);
  });
}

function loadDataOnTableListUsers(arrUsers) {
  deleteDataTableListUsers();
  arrUsers.forEach((value) => {
    const data = document.querySelector("#tableListUsers tbody");
    const age = calculateAgeUser(value.parent1.year);
    let surname = value.parent1.surname;
    if (surname === undefined) surname = "";
    const stringHtml = `<td id="${value.idFamily}">${value.idFamily}</td><td>${value.parent1.name} ${surname}</td><td>${age}</td><td>${value.parent1.tlf}</td><td class="text-right"><i id="plus" value="0" class="far fa-plus-square"></i></td>`;
    data.insertAdjacentHTML("beforeend", stringHtml);
  });
}

function deleteDataTableListUsers() {
  const data = document.querySelectorAll("#tableListUsers tbody *");
  data.forEach((value) => value.remove());
}

function showInfoUserOnTableListUsers() {
  const data = document.querySelector("#tableListUsers");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      event.target.id === "plus" &&
      event.target.getAttribute("value") === "0"
    ) {
      event.target.setAttribute("value", "1");
      changeDetailIcon();
      return;
    }
    if (
      event.target.id === "plus" &&
      event.target.getAttribute("value") === "1"
    ) {
      addDetailsUser();
      changeDetailIcon();
      event.target.setAttribute("value", "0");
    }
  });
}

function addDetailsUser() {}

function changeDetailIcon() {
  event.target.classList.toggle("fa-minus");
  event.target.classList.toggle("fas");
  event.target.classList.toggle("fa-plus-square");
  event.target.classList.toggle("far");
}

export { showListUsers, showInfoUserOnTableListUsers };
