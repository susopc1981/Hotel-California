import { store } from "./script.js";

function ShowHideHtmlElement(id, option) {
  const data = document.querySelector(id);
  if (option === "hide") {
    data.classList.add("d-none");
    return;
  }
  data.classList.remove("d-none");
}

export { ShowHideHtmlElement };
