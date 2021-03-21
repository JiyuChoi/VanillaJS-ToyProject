
const dnBtn = document.querySelector(".js-daynight");
const wrapper = document.querySelector("#wrapper");
const nav = document.querySelector(".nav-bar");
const arr = [dnBtn, wrapper, body, nav];

function changeMode() {
    if (dnBtn.innerText === "day") {
        dnBtn.innerText = "night";
        arr.forEach((value) => {
            value.classList.remove("day");
            value.classList.add("night");
        });
    } else {
        dnBtn.innerText = "day";
        arr.forEach((value) => {
            value.classList.remove("night");
            value.classList.add("day");
        });
    }
}

dnBtn.addEventListener("click", changeMode);