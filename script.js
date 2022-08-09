let darkToggle = document.querySelector(".darkmode");
let start_hold;
let current_hold;
let start;
let end;
let timer = document.querySelector(".timer");;
let time = 0;
let interval;

let darkMode = false;
let greenColor = "lightgreen";
let redColor = "#f99";

// status:
// 0 if inactive
// 1 if space is held to start the timer
// 2 if the timer is active
let status = 0;

/* TIMER FORMATTING */
let l = (s, places) => {
    if (places == 3) {
        if (s.length == 3) return s;
        if (s.length == 2) return "0" + s;
        if (s.length == 1) return "00" + s;
    }
    if (places == 2) {
        return (s.length == 2) ? s : "0" + s;
    }
    if (places == 1) return s;
};

// adjustFormat takes the time in ms and converts it to a text format (hr:min:sec.ms)
let adjustFormat = (ms) => {
    let msLeft = ms;
    let hours = Math.floor(msLeft / 3600000).toString();
    msLeft = msLeft % 3600000;
    
    let minutes = Math.floor(msLeft / 60000).toString();
    msLeft = msLeft % 60000;
    
    let seconds = Math.floor(msLeft / 1000).toString();
    msLeft = msLeft % 1000;
    
    msLeft = msLeft.toString();

    return `${hours}:${l(minutes,2)}:${l(seconds,2)}.${l(msLeft,3)}`

};

// timing adjusts the timing for the 
let timing = () => { 
    end = Date.now();
    time = end - start;
    timer.innerHTML = adjustFormat(time);    
}


toggleDarkMode = (e) => {
    if (darkMode) {
        console.log("hi");
        darkMode = false;
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
        greenColor = "lightgreen";
        redColor = "#f99";
    } else {
        console.log("hi2");
        darkMode = true;
        document.body.style.backgroundColor = "#222";
        document.body.style.color = "#ddd";
        greenColor = "darkgreen";
        redColor = "#900";
    }
}

/* DOCUMENT EVENT FUNCTIONS */
window.onload = () => {
    darkToggle = document.querySelector(".darkmode");
    darkToggle.addEventListener("click", (e) => toggleDarkMode(e));
    
    timer = document.querySelector(".timer");
    start = Date.now();
    end = Date.now();
    time = end - start;
    timer.innerHTML = adjustFormat(time);
}

window.addEventListener("keydown", (e) => {
    console.log(e.key);
    if (status == 2) {
        clearInterval(interval);
        status = 0;
        start = 0;
        start_hold = 0;
    } else if (e.key == " " && status == 0) {
        status = 1;
        start_hold = Date.now();
    }
});

window.addEventListener("keypress", (e) => {
    e.preventDefault();
    if (e.key == " " && status == 1) {
        current_hold = Date.now();
        var hold_time = current_hold - start_hold;
        if (hold_time > 500) {
            timer.style.backgroundColor = greenColor;
        } else {
            timer.style.backgroundColor = redColor;
        }
    }
});

window.addEventListener("keyup", (e) => {
    if (e.key == " " && status == 1) {
        start = Date.now();
        var hold_time = start - start_hold;
        start_hold = 0;
        timer.style.backgroundColor = "inherit";
        if (hold_time > 500) {
            status = 2;
            interval = setInterval(timing, 1);
        } else {
            status = 0;
        }
    }
});