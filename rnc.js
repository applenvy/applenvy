// https://devforum.roblox.com/t/chat-color-predicter/559433

const colorTable = [
    "#fd2943", // formerly bright red
    "#01a2ff", // formerly bright blue
    "#02b857", // formerly earth green
    "#6B327C", // bright violet
    "#DA8541", // bright orange
    "#F5CD30", // bright yellow
    "#E8BAC8", // light reddish violet
    "#D7C59A", // brick yellow
]

function getNameValue(pName) {
    var value = 0;
    const len = pName.length;
    for (let i = 0; i < len; i++) {
        var cValue = pName.charCodeAt(i);
        var reverseIndex = len - i; 
        if (len % 2 == 1) {
            reverseIndex--;
        }

        if (reverseIndex % 4 >= 2) {
            cValue = -cValue;
        }
        
        value += cValue;
    }
    
    return value;
}

// let color_offset = 0; // don't think this ever actually gets used?

// lua modulo is different??????? whyyyyyyyyyyyyyy
// https://www.educba.com/lua-modulo/
// https://stackoverflow.com/questions/9695697/lua-replacement-for-the-operator 
function luaMod(a, b) {
    return a - Math.floor(a / b) * b
}

// console.log(-30 % 40); // -30
// console.log(30 % -40); // 30
// console.log(luaMod(-30, 40)); // 10
// console.log(luaMod(30, -40)); // -10

function computeNameColor(pName) {
    // console.log(getNameValue(pName) % colorTable.length);
    // return colorTable[getNameValue(pName) % colorTable.length];
    if (pName == "") return "#555555";
    return colorTable[luaMod(getNameValue(pName), colorTable.length)]; // le epic 0-index
};

const inputEl = document.getElementById("input");

const inputHandler = function(t) {
    const name = t.target.value;
    changeColors(name);
}

inputEl.addEventListener("input", inputHandler);


function initColor() {
    const urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get("name")

    if (!name) {
        name = document.getElementById("input").value;
    }

    if (name) {
        inputEl.value = name;
        changeColors(name);
    }
}

function changeColors(name) {
    const nameColor = computeNameColor(name);
    inputEl.style.color = nameColor;
    inputEl.style.textShadow = "0 0 8vw " + nameColor;
    document.body.style.backgroundColor = nameColor;
    document.getElementById("invalid").style.backgroundColor = nameColor;
    validateUser(name);
}

// idk why i decided to do this w/ regex
// stole it from https://stackoverflow.com/questions/54391861
const re = /^(?=^[^_]+_?[^_]+$)\w{3,20}$/
const invalid = document.getElementById("invalid");
function validateUser(pName) {
    if (re.test(pName) && pName.length >= 3 || pName.length == 0) {
        invalid.style.opacity = 0;
    } else {
        invalid.style.opacity = 0.5;
    } 
}

// ^(?=^[^_]+_?[^_]+$)\w{3,20}$

initColor();