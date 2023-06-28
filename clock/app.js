setInterval(() => {
    let d = new Date();
    let time = d.toLocaleTimeString();
    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds()
    if (hour < 10) {
        hour = `0${hour}`;
    }

    if (min < 10) {
        min = `0${min}`;
    }

    if (sec < 10) {
        sec = `0${sec}`;
    }

    document.getElementById('hour').innerText = hour;
    document.getElementById('min').innerText = min;
    document.getElementById('sec').innerText = sec;

    console.log(d.getSeconds());
}, 1000);
