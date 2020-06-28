import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";
import { calculateDays, calculateAmount } from "./inVoice.js";
import { formatDate } from "./getCheckInData.js";

function showCheckOutForm() {
  const data = document.querySelector("#btn-checkout");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#checkOutFormContainer", "show");
    ShowHideHtmlElement("#checkInFormContainer", "hide");
    ShowHideHtmlElement("#inVoiceFormContainer", "hide");
    ShowHideHtmlElement("#changeRoomFormContainer", "hide");
    ShowHideHtmlElement("#listRoomsUsersContainer", "hide");
  });
}

function checkOut() {
  const data = document.querySelector("#checkOutForm");
  data.addEventListener("submit", (event) => {
    event.preventDefault();
    const user = checkDataCheckOut("#checkOutDni");
    if (user) {
      const index = store.customer.indexOf(user);
      printDataUserOnInVoice(user);
      printDataReserve(user);
      ShowHideHtmlElement("#checkOutInVoice", "show");
      ShowHideHtmlElement("#confirmCheckOut", "show");
    }
  });
}

function confirmCheckOut() {
  const data = document.querySelector("#confirmCheckOut");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    const idUser = document.querySelector("#checkOutDni");
    const user = store.customer.find(
      (value) => value.parent1.idCard === idUser.value
    );
    let surname = user.parent1.surname;
    if (user.parent1.surname === undefined) surname = "";
    const confirmCheckOutOk = confirm(
      `¿Va a realizar el Check-Out del usuario ${user.parent1.name} ${surname}`
    );
    if (!confirmCheckOutOk) return;
    const index = store.customer.indexOf(user);
    store.customer.splice(index, 1);
    addUsersToOldCustomer(user);
    user.numRooms.forEach((numRoom) => {
      const indexRoom = store.rooms.findIndex(
        (value) => value.idRoom === numRoom
      );
      store.rooms[indexRoom].guest = "";
    });
    ShowHideHtmlElement("#checkOutInVoice", "hide");
    ShowHideHtmlElement("#confirmCheckOut", "hide");
    idUser.value = "";
    alert("Check-Out realizado con éxito");
  });
}

function printDataReserve(user) {
  const data = document.querySelector("#dataInVoiceUser tbody");
  const dataToRemove = document.querySelectorAll("#dataInVoiceUser tbody *");
  dataToRemove.forEach((value) => value.remove());
  let checkOutDate;
  user.checkOutDate === ""
    ? (checkOutDate = formatDate(new Date()))
    : (checkOutDate = user.checkOutDate);
  const days = calculateDays(user.checkInDate, checkOutDate);
  const amount = calculateAmount(user.idFamily, days);
  user.numRooms.forEach((value) => {
    const dataRoom = store.rooms.find(
      (valueRoom) => valueRoom.idRoom === value
    );
    const price = dataRoom.price;
    const stringHtml = `<tr><td>${days}</td><td>Dias en la habitación ${value}</td><td>${price}€</td><td>${
      days * price
    }€</td></tr>`;
    data.insertAdjacentHTML("beforeend", stringHtml);
  });
  for (let i = 0; i < 8; i++) {
    data.insertAdjacentHTML("beforeend", "<tr><td> </td></tr>");
  }
  const table = document.querySelector("#dataInVoiceUser");
  const divToRemove = document.querySelector("#printedInVoice div");
  if (divToRemove) divToRemove.remove();
  table.insertAdjacentHTML(
    "afterend",
    `<div class="totalAmount"><p>Subtotal:${amount}€</p><p>IVA (10%): ${
      amount * 0.1
    }€</p><p>Total: ${amount + amount * 0.1}€</p></div>`
  );
}

function printDataUserOnInVoice(user) {
  const name = document.querySelector("#checkOutInVoiceName");
  const dni = document.querySelector("#checkOutInVoiceDni");
  const tlf = document.querySelector("#checkOutInVoiceTlf");
  let surname;
  user.parent1.surname === undefined
    ? (surname = "")
    : (surname = user.parent1.surname);
  name.textContent = `${user.parent1.name} ${surname}`;
  dni.textContent = `NIF: ${user.parent1.idCard}`;
  tlf.textContent = `TLF: ${user.parent1.tlf}`;
}

function addUsersToOldCustomer(user) {
  let surname = user.parent1.surname;
  if (user.parent1.surname === undefined) surname = "";
  const newUser = {
    idCard: user.parent1.idCard,
    name: user.parent1.name,
    surname: surname,
    year: user.parent1.year,
    checkIndate: user.checkInDate,
    checkOutDate: formatDate(new Date()),
  };
  if (user.adults.length !== 0) {
    user.adults.forEach((value) => {
      const data = store.oldCustomer.indexOf(value);
      if (data === -1) {
        const newAdult = {
          ...value,
          checkInDate: user.checkInDate,
          checkOutDate: formatDate(new Date()),
        };
        store.oldCustomer.push(newAdult);
      }
    });
  }
  const data = store.oldCustomer.find((value) => value.idCard === user.idCard);
  if (!data) store.oldCustomer.push(newUser);
}

function checkDataCheckOut(id) {
  const data = document.querySelector(id).value;
  if (data === "") {
    alert("El campo DNI no puede estar vacío");
    return;
  }
  const user = store.customer.find((value) => value.parent1.idCard === data);
  if (!user) {
    alert("DNI no encontrado");
    return;
  }
  return user;
}

export { showCheckOutForm, checkOut, checkDataCheckOut, confirmCheckOut };
