setInterval(() => {
    let d = new Date();
    let time = d.toLocaleTimeString();
    let hour = time.slice(0, 1)
    let min = time.slice(2, 4)
    let sec = time.slice(5, 7)
    if (hour < 10) {
        hour = 0 + hour;
    }
    document.getElementById('hour').innerText = hour;
    document.getElementById('min').innerText = min;
    document.getElementById('sec').innerText = sec;
}, 1000);
