import { store } from "./script.js";
import { ShowHideHtmlElement } from "./commont-scripts.js";

function showSelectCapacityForm() {
  const data = document.querySelector("#btn-selectCapacity");
  data.addEventListener("click", (event) => {
    event.preventDefault();
    ShowHideHtmlElement("#form-selectCapacity", "show");
    ShowHideHtmlElement("#form-selectRoom", "hide");
    // ShowHideHtmlElement("#form-selectRoom");
    ShowHideHtmlElement("#tableRooms", "hide");
  });
}

export { showSelectCapacityForm };
