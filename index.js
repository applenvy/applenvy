// warning: this is practically my foray into js 
// i do not know formatting conventions

getCurrentCentralTime();
resizeText();

function getCurrentCentralTime() {
    let xhr = new XMLHttpRequest();
    const tzinfo = document.getElementById("tzinfo");
    xhr.open("GET", "https://worldtimeapi.org/api/timezone/America/Chicago");
    xhr.responseType = "json"
    xhr.onload = function() {
        if (xhr.status == 200) {
            if (xhr.response.abbreviation = "CDT") {
                tzinfo.innerHTML = "CDT (UTC-5)";
            } else if (xhr.response.abbreviation = "CST") {
                tzinfo.innerHTML = "CST (UTC-6)";
            }
        } 
    };

    xhr.send();
}

// text scaling can get a little bit broken if you maximize the window,
// adding a small delay seems to help
window.addEventListener("resize", () => setTimeout(() => {
    resizeText();
}, 200));

function resizeText() {

    const card_width = document.getElementById("center-card").offsetWidth;

    // TITLE
    const title = document.getElementById("title");
    title.firstElementChild.style.fontSize = card_width / 6 + "px";
    title.style.transform = `translateY(-${card_width / 7}px)`

    // HORIZONTAL SEPARATOR
    const sep = document.getElementById("separator");
    sep.style.marginTop = -card_width / 8 + 40 + "px";

    // CONTENT
    const text = document.getElementById("card-content");
    text.style.fontSize = card_width / 16 + "px";
    text.style.padding = `0 ${card_width / 18}px 6px`;

    // FOOTER
    const footer = document.getElementsByTagName("footer")[0];
    footer.style.fontSize = card_width / 22 + "px";

    // ICONS
    const icons = document.getElementsByTagName("img");
    for (const icon of icons) {
        icon.style.width = card_width / 12 + "px";
    }

    const names = document.getElementsByClassName("name");
    for (const name of names) {
        name.style.fontSize = card_width / 28 + "px";
    }
}