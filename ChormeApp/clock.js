const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");


function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const apm = "";
    if (hours > 12) {
        hours -= 12;
        amp = "오후";
    }
    else {
        amp = "오전";
    }
    clockTitle.innerText = `${amp} ${hours < 10 ? `0${hours}` : hours
        }: ${minutes < 10 ? `0${minutes}` : minutes
        }: ${seconds < 10 ? `0${seconds}` : seconds} `;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();